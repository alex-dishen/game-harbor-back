import { Process, Processor } from '@nestjs/bull';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import {
  FetchAndInsertArgs,
  GetRawgDataArgs,
  RawgAllGamesResponse,
  RawgGameResponse,
} from 'src/api/integration/types';
import { IntegrationMapper } from 'src/api/integration/mapper';
import { TimeService } from 'src/shared/time/time.service';
import { QUEUE } from 'src/api/integration/constants';

@Processor(QUEUE.Integration)
export class Consumer {
  constructor(
    private prisma: PrismaService,
    private time: TimeService,
    private integrationMapper: IntegrationMapper,
  ) {}

  @Process()
  async messageJob() {
    await this.fetchAndInsert({
      numberOfPages: 4,
      params: { dates: this.time.getLast30Days() },
    });

    await this.fetchAndInsert({
      numberOfPages: 2,
      params: { dates: this.time.getThisWeek() },
    });

    await this.fetchAndInsert({
      numberOfPages: 2,
      params: { dates: this.time.getNextWeek() },
    });
  }

  private async getRawgData<T>(args: GetRawgDataArgs): Promise<T> {
    const searchParams = new URLSearchParams(
      args.params as Record<string, string>,
    ).toString();

    const fetchString =
      args.nextURL ||
      `https://api.rawg.io/api/${args.endpoint}?${searchParams}&key=${process.env.RAWG_KEY}`;

    const response = await fetch(fetchString);

    return response.json();
  }

  async fetchAndInsert(args: FetchAndInsertArgs) {
    let nextURL = '';

    for (let i = 0; i < args.numberOfPages; i++) {
      try {
        const allGames = await this.getRawgData<RawgAllGamesResponse>({
          nextURL: nextURL,
          endpoint: 'games',
          params: {
            ordering: '-added',
            page_size: 40,
            ...args.params,
          },
        });

        const gameDetails = await Promise.all(
          allGames.results.map((game) =>
            this.getRawgData<RawgGameResponse>({
              endpoint: `games/${game.id}`,
            }),
          ),
        );

        const games = this.integrationMapper.shapeData(allGames, gameDetails);

        for (const game of games) {
          try {
            await this.prisma.game.create({ data: game });
          } catch (error) {
            if (error.code === 'P2002') {
              console.error(
                `Error creating game ${game.name}: ${error.message}`,
              );
            } else {
              throw error;
            }
          }
        }

        if (!allGames.next) return;

        await new Promise((resolve) => setTimeout(resolve, 10000));

        nextURL = allGames.next;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.log('Rate limit exceeded. Waiting before retrying...');
          await new Promise((resolve) => setTimeout(resolve, 2000));
          i--;
        } else {
          console.error('An error occurred:', error.message);
        }
      }
    }
  }
}
