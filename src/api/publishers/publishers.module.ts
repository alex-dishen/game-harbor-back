import { Module } from '@nestjs/common';
import { PublishersRepository } from 'src/api/publishers/publishers.repository';
import { PublishersService } from 'src/api/publishers/publishers.service';
import { PublishersController } from 'src/api/publishers/publishers.controller';

@Module({
  controllers: [PublishersController],
  providers: [PublishersRepository, PublishersService],
})
export class PublishersModule {}
