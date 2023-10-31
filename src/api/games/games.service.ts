import { CreateGameDto } from './dto';
import { GamesRepository } from './games.repository';
import { Injectable } from '@nestjs/common';
// import { GameDto } from './dto';

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
    return this.gamesRepository.create(data);
  }

  deleteGame(id: string) {
    return this.gamesRepository.delete({ id });
  }
}
