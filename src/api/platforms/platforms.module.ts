import { Module } from '@nestjs/common';
import { PlatformsController } from 'src/api/platforms/platforms.controller';
import { PlatformsRepository } from 'src/api/platforms/platforms.repository';
import { PlatformsService } from 'src/api/platforms/platforms.service';

@Module({
  controllers: [PlatformsController],
  providers: [PlatformsRepository, PlatformsService],
})
export class PlatformsModule {}
