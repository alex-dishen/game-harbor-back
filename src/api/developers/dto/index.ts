import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DevelopersDto {
  @ApiProperty({ example: '9889c8ad-d244-4ba7-b2bb-55511e576df6' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Rockstar North' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'rockstar-north' })
  @IsString()
  @IsOptional()
  slug: string;
}

export class CreateDeveloperDto extends OmitType(DevelopersDto, [
  'id',
  'slug',
]) {}
