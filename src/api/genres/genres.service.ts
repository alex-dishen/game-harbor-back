import { Injectable } from '@nestjs/common';
import { GenresRepository } from 'src/api/genres/genres.repository';
import { CreateGenresDto } from 'src/api/genres/dto';

@Injectable()
export class GenresService {
  constructor(private genresRepository: GenresRepository) {}

  getAllGenres() {
    return this.genresRepository.getAll();
  }

  getGenreById(id: string) {
    return this.genresRepository.getBy({ id });
  }

  createGenre(data: CreateGenresDto) {
    return this.genresRepository.create(data);
  }

  updateGenre(id: string, data: CreateGenresDto) {
    return this.genresRepository.update({ where: { id }, data });
  }

  deleteGenre(id: string) {
    return this.genresRepository.delete({ id });
  }
}
