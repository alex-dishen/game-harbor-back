import { Module } from '@nestjs/common';
import { GamesController } from 'src/api/games/games.controller';
import { GamesService } from 'src/api/games/games.service';
import { GamesRepository } from 'src/api/games/games.repository';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
})
export class GamesModule {}
