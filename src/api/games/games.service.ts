import { CreateGameDto } from './dto';
import { GamesRepository } from './games.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesService {
  constructor(private gamesRepository: GamesRepository) {}

  getAll() {
    return this.gamesRepository.getAll();
  }

  getById(id: string) {
    return this.gamesRepository.getById({ id });
  }

  createGame(data: CreateGameDto) {
    const { platformId, ...restData } = data;

    return this.gamesRepository.create({
      ...restData,
      platforms: {
        create: platformId.map((id) => ({ platform: { connect: { id } } })),
      },
    });
  }

  deleteGame(id: string) {
    return this.gamesRepository.delete({ id });
  }
}
