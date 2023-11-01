import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto, GameDto } from './dto';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private games: GamesService) {}

  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, type: [GameDto] })
  @Get('/all')
  getAllGames() {
    return this.games.getAll();
  }

  @ApiOperation({ summary: 'Get a single game' })
  @Get('/:id')
  getGame() {}

  @ApiOperation({ summary: 'Create a new game' })
  @Post('/create')
  createGame(@Body() data: CreateGameDto) {
    return this.games.createGame(data);
  }

  @ApiOperation({ summary: 'Delete a game' })
  @Delete('/delete')
  deleteGame() {}
}
