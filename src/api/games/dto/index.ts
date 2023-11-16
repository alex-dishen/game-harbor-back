import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { IdNameDto } from 'src/shared/dto';

export class GameDto {
  @ApiProperty({ example: 'b86fa12a-76fc-46f5-8a3e-bf39e7be4c4e' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Forspoken' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'forspoken' })
  @IsString()
  slug: string;

  @ApiProperty({
    example:
      'https://media.rawg.io/media/games/3a0/3a074a80d9a45e82aff7532f0162628e.jpg',
  })
  @IsUrl()
  background_image: string;

  @ApiProperty({
    example:
      'Project Athia is the culmination of Luminous Productions’ philosophy to create a completely new ...',
  })
  @IsString()
  description_raw: string;

  @ApiProperty({
    example:
      '<p>Project Athia is the culmination of Luminous Productions’ philosophy to create a completely new ...</p>',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: '2023-10-31T04:50:07.398Z' })
  @IsString()
  released: string;

  @ApiProperty({
    example: [
      {
        id: '2474a226-ac3b-4b2f-a79c-70da86885af2',
        name: 'Luminous Productions',
      },
    ],
  })
  @IsArray()
  developers: IdNameDto[];

  @ApiProperty({
    example: [
      { id: '95d74c6b-5644-4dc5-8f08-fec05643703f', name: 'Square Enix' },
    ],
  })
  @IsArray()
  publishers: IdNameDto[];

  @ApiProperty({
    example: [
      {
        id: '117c81cd-7132-4e67-b969-6d9a3e2d05df',
        name: 'Play Station',
        slug: 'play station',
      },
    ],
  })
  @IsArray()
  platforms: { slug: string }[] & IdNameDto[];

  @ApiProperty({
    example: [{ id: '1f556ab5-4b96-4c1f-a38b-95b7545efa67', name: 'Action' }],
  })
  @IsArray()
  genres: IdNameDto[];

  @ApiProperty({ example: 'https://forspoken.square-enix-games.com/en-us/' })
  @IsUrl()
  @IsOptional()
  website: string;

  @ApiProperty({ example: 230 })
  @IsNumber()
  added: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  rating: number;

  @ApiProperty({ example: '2023-10-31T04:50:07.398Z' })
  @IsString()
  updated: string;

  // @ApiProperty({ example: [{ id: '', image: '' }] })
  // @IsArray()
  // screenshots: { id: string; image: string }[];
}

export class CreateGameDto extends OmitType(GameDto, [
  'id',
  'platforms',
  'genres',
]) {
  @ApiProperty({
    example: [
      '117c81cd-7132-4e67-b969-6d9a3e2d05df',
      '652d302f-c5f5-4944-87a0-9b64bb3f18e5',
    ],
  })
  @IsArray()
  platformIds: string[];

  @ApiProperty({
    example: [],
  })
  @IsArray()
  genreIds: string[];
}
