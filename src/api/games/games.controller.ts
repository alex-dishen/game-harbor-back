import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GamesService } from 'src/api/games/games.service';
import {
  CreateGameDto,
  GameDto,
  GetGamesDto,
  ResponseGamesDto,
} from 'src/api/games/dto';
import { MessageDto } from 'src/shared/dto';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private games: GamesService) {}

  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Post('/create')
  createGame(@Body() data: CreateGameDto) {
    return this.games.createGame(data);
  }

  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, type: ResponseGamesDto })
  @Post('/all')
  getAllGames(@Body() data: GetGamesDto) {
    return this.games.getAllGames(data);
  }

  @ApiOperation({ summary: 'Get a single game' })
  @ApiResponse({ status: 200, type: GameDto })
  @Get('/:id')
  getGame(@Param('id') id: string) {
    return this.games.getGameById(id);
  }

  @ApiOperation({ summary: 'Delete a game' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Delete('/:id')
  deleteGame(@Param('id') id: string) {
    return this.games.deleteGame(id);
  }
}
