import { Injectable } from '@nestjs/common';
import { GamesRepository } from 'src/api/games/games.repository';
import { GamesMapper } from 'src/api/games/mapper';
import { CreateGameDto } from 'src/api/games/dto';
import { getPrice, transformText } from 'src/shared/helpers';
import { MessageDto } from 'src/shared/dto';

@Injectable()
export class GamesService {
  constructor(
    private gamesRepository: GamesRepository,
    private gamesMapper: GamesMapper,
  ) {}

  async getAllGames() {
    const games = await this.gamesRepository.getAll();

    return this.gamesMapper.toArrayDto(games);
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
                slug: transformText(developerName),
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
                slug: transformText(publisherName),
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
