import { Injectable } from '@nestjs/common';
import { GamesRepository } from 'src/api/games/games.repository';
import { GamesMapper } from 'src/api/games/mapper';
import {
  CreateGameDto,
  GetGamesDto,
  ResponseGamesDto,
} from 'src/api/games/dto';
import { getPrice, transformTitleToSlug } from 'src/shared/helpers';
import { MessageDto } from 'src/shared/dto';
import { generateCursor } from 'src/api/games/helpers';
import { GamesOrderBy } from 'src/api/games/constants';

@Injectable()
export class GamesService {
  constructor(
    private gamesRepository: GamesRepository,
    private gamesMapper: GamesMapper,
  ) {}

  async getAllGames(params: GetGamesDto): Promise<ResponseGamesDto> {
    const games = await this.gamesRepository.getAll(
      {
        orderBy: params.ordering || GamesOrderBy.Popularity,
        skip: params.cursor ? 1 : 0,
        cursor: params.cursor,
      },
      {
        genres: { some: { genre_id: params.genre_id } },
        platforms: { some: { platform_id: params.platform_id } },
        released: {
          lte: params.dates?.[1],
          gte: params.dates?.[0],
        },
      },
    );

    return {
      cursor: generateCursor(
        params.ordering || GamesOrderBy.Popularity,
        games[games.length - 1],
      ),
      data: this.gamesMapper.toArrayDto(games),
    };
  }

  async getGameById(id: string) {
    const game = await this.gamesRepository.getBy({ id });

    return this.gamesMapper.toDto(game);
  }

  async createGame(data: CreateGameDto): Promise<MessageDto> {
    const {
      platformIds,
      genreIds,
      developers,
      publishers,
      screenshots,
      ...restData
    } = data;

    await this.gamesRepository.create({
      ...restData,
      price: getPrice(0),
      platforms: {
        create: platformIds.map((id) => ({ platform: { connect: { id } } })),
      },
      genres: {
        create: genreIds.map((id) => ({ genre: { connect: { id } } })),
      },
      developers: {
        create: developers.map((developerName) => ({
          developer: {
            connectOrCreate: {
              where: { name: developerName },
              create: {
                name: developerName,
                slug: transformTitleToSlug(developerName),
              },
            },
          },
        })),
      },
      publishers: {
        create: publishers.map((publisherName) => ({
          publisher: {
            connectOrCreate: {
              where: { name: publisherName },
              create: {
                name: publisherName,
                slug: transformTitleToSlug(publisherName),
              },
            },
          },
        })),
      },
      screenshots: {
        create: screenshots.map((image) => ({
          image_url: image,
        })),
      },
    });

    return { message: 'Game is created' };
  }

  async deleteGame(id: string) {
    await this.gamesRepository.delete({ id });

    return { message: 'Game is deleted' };
  }
}
