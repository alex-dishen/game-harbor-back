import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GamesService } from './games.service';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private games: GamesService) {}

  @Get('/all')
  getAllGames() {}

  @Get('/:id')
  getGame() {}

  @Post('/create')
  createGame() {}

  @Delete('/delete')
  deleteGame() {}
}
