import { Injectable } from '@nestjs/common';
import { CreateDeveloperDto } from 'src/api/developers/dto';
import { DevelopersRepository } from 'src/api/developers/developers.repository';
import { transformTitleToSlug } from 'src/shared/helpers';

@Injectable()
export class DevelopersService {
  constructor(private developersRepository: DevelopersRepository) {}

  async createDeveloper(data: CreateDeveloperDto) {
    await this.developersRepository.create({
      ...data,
      slug: transformTitleToSlug(data.name),
    });

    return { message: 'Developer is created' };
  }

  getAllDevelopers() {
    return this.developersRepository.getAll();
  }

  getDeveloperById(id: string) {
    return this.developersRepository.getBy({ id });
  }

  async updateDeveloper(id: string, data: CreateDeveloperDto) {
    await this.developersRepository.update({
      where: { id },
      data: { ...data, slug: transformTitleToSlug(data.name) },
    });

    return { message: 'Developer is updated' };
  }

  async deleteDeveloper(id: string) {
    await this.developersRepository.delete({ id });

    return { message: 'Developer is deleted' };
  }
}
