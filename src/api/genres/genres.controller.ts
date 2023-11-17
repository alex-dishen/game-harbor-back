import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenresService } from 'src/api/genres/genres.service';
import { CreateGenresDto, GenresDto } from 'src/api/genres/dto';
import { MessageDto } from 'src/shared/dto';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @ApiOperation({ summary: 'Create a genre' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Post('/create')
  createGenre(@Body() data: CreateGenresDto) {
    return this.genresService.createGenre(data);
  }

  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({ status: 200, type: [GenresDto] })
  @Get('/all')
  getAllGenres() {
    return this.genresService.getAllGenres();
  }

  @ApiOperation({ summary: 'Get a genre by id' })
  @ApiResponse({ status: 200, type: GenresDto })
  @Get('/:id')
  getGenreById(@Param('id') id: string) {
    return this.genresService.getGenreById(id);
  }

  @ApiOperation({ summary: 'Update a genre' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Put('/:id')
  updateGenre(@Param('id') id: string, @Body() data: CreateGenresDto) {
    return this.genresService.updateGenre(id, data);
  }

  @ApiOperation({ summary: 'Delete a game' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Delete('/:id')
  deleteGenre(@Param('id') id: string) {
    return this.genresService.deleteGenre(id);
  }
}
