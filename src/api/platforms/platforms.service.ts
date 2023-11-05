import { Injectable } from '@nestjs/common';
import { PlatformsRepository } from 'src/api/platforms/platforms.repository';
import { CreatePlatformDto } from 'src/api/platforms/dto';

@Injectable()
export class PlatformsService {
  constructor(private platformsRepository: PlatformsRepository) {}

  getAllPlatforms() {
    return this.platformsRepository.getAll();
  }

  getPlatformById(id: string) {
    return this.platformsRepository.getById({ id });
  }

  createPlatform(data: CreatePlatformDto) {
    return this.platformsRepository.create(data);
  }

  updatePlatform(id: string, data: CreatePlatformDto) {
    return this.platformsRepository.update({ where: { id }, data });
  }

  deletePlatform(id: string) {
    return this.platformsRepository.delete({ id });
  }
}
