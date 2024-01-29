import { Injectable } from '@nestjs/common';
import { PublishersRepository } from 'src/api/publishers/publishers.repository';
import { CreatePublisherDto } from 'src/api/publishers/dto';
import { transformTitleToSlug } from 'src/shared/helpers';

@Injectable()
export class PublishersService {
  constructor(private publishersRepository: PublishersRepository) {}

  async createPublisher(data: CreatePublisherDto) {
    await this.publishersRepository.create({
      ...data,
      slug: transformTitleToSlug(data.name),
    });

    return { message: 'Publisher is created' };
  }

  getAllPublishers() {
    return this.publishersRepository.getAll();
  }

  getPublisherById(id: string) {
    return this.publishersRepository.getBy({ id });
  }

  async updatePublisher(id: string, data: CreatePublisherDto) {
    await this.publishersRepository.update({
      where: { id },
      data: { ...data, slug: transformTitleToSlug(data.name) },
    });

    return { message: 'Publisher is updated' };
  }

  async deletePublisher(id: string) {
    await this.publishersRepository.delete({ id });

    return { message: 'Publisher is deleted' };
  }
}
