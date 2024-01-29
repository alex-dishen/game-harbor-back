import { Injectable } from '@nestjs/common';
import { PlatformsRepository } from 'src/api/platforms/platforms.repository';
import { CreatePlatformDto } from 'src/api/platforms/dto';

@Injectable()
export class PlatformsService {
  constructor(private platformsRepository: PlatformsRepository) {}

  async getAllPlatforms() {
    await this.platformsRepository.getAll();

    return { message: 'Platform is created' };
  }

  getPlatformById(id: string) {
    return this.platformsRepository.getBy({ id });
  }

  createPlatform(data: CreatePlatformDto) {
    return this.platformsRepository.create(data);
  }

  async updatePlatform(id: string, data: CreatePlatformDto) {
    await this.platformsRepository.update({ where: { id }, data });

    return { message: 'Platform is updated' };
  }

  async deletePlatform(id: string) {
    await this.platformsRepository.delete({ id });

    return { message: 'Platform is deleted' };
  }
}
