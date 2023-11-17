import { Module } from '@nestjs/common';
import { DevelopersController } from 'src/api/developers/developers.controller';
import { DevelopersService } from 'src/api/developers/developers.service';
import { DevelopersRepository } from 'src/api/developers/developers.repository';

@Module({
  controllers: [DevelopersController],
  providers: [DevelopersRepository, DevelopersService],
})
export class DevelopersModule {}
