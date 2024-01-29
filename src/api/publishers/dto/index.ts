import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PublisherDto {
  @ApiProperty({ example: 'c9fbbd6a-0ee7-45ae-8c33-f1bda90c16cf' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Rockstar Games' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'rockstar-games' })
  @IsString()
  slug: string;
}

export class CreatePublisherDto extends OmitType(PublisherDto, [
  'id',
  'slug',
]) {}
