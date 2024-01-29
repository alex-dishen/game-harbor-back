import { Module } from '@nestjs/common';
import { GenresController } from 'src/api/genres/genres.controller';
import { GenresRepository } from 'src/api/genres/genres.repository';
import { GenresService } from 'src/api/genres/genres.service';

@Module({
  controllers: [GenresController],
  providers: [GenresRepository, GenresService],
})
export class GenresModule {}
