import { Injectable } from '@nestjs/common';
import { GamesRepository } from 'src/api/games/games.repository';
import { GamesMapper } from 'src/api/games/mapper';
import { CreateGameDto } from 'src/api/games/dto';

@Injectable()
export class GamesService {
  constructor(
    private gamesRepository: GamesRepository,
    private gamesMapper: GamesMapper,
  ) {}

  async getAll() {
    const games = await this.gamesRepository.getAll();

    return this.gamesMapper.toArrayDto(games);
  }

  async getById(id: string) {
    const game = await this.gamesRepository.getById({ id });

    return this.gamesMapper.toDto(game);
  }

  createGame(data: CreateGameDto) {
    const { platformIds, genreIds, ...restData } = data;

    return this.gamesRepository.create({
      ...restData,
      platforms: {
        create: platformIds.map((id) => ({ platform: { connect: { id } } })),
      },
      genres: {
        create: genreIds.map((id) => ({ genre: { connect: { id } } })),
      },
    });
  }

  deleteGame(id: string) {
    return this.gamesRepository.delete({ id });
  }
}
