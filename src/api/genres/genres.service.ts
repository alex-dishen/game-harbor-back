import { Injectable } from '@nestjs/common';
import { GenresRepository } from 'src/api/genres/genres.repository';
import { CreateGenresDto } from 'src/api/genres/dto';

@Injectable()
export class GenresService {
  constructor(private genresRepository: GenresRepository) {}

  async createGenre(data: CreateGenresDto) {
    await this.genresRepository.create(data);

    return { message: 'Genre is created' };
  }

  getAllGenres() {
    return this.genresRepository.getAll();
  }

  getGenreById(id: string) {
    return this.genresRepository.getBy({ id });
  }

  async updateGenre(id: string, data: CreateGenresDto) {
    await this.genresRepository.update({ where: { id }, data });

    return { message: 'Genre is updated' };
  }

  async deleteGenre(id: string) {
    await this.genresRepository.delete({ id });

    return { message: 'Genre is deleted' };
  }
}
