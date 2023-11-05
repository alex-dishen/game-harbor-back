import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class PlatformDto {
  @ApiProperty({ example: '117c81cd-7132-4e67-b969-6d9a3e2d05df' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Playstation' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'playstation' })
  @IsString()
  slug: string;
}

export class CreatePlatformDto extends OmitType(PlatformDto, ['id']) {}
