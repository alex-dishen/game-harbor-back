import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { IdNameSlug } from 'src/shared/types';
import { GamesOrderBy } from 'src/api/games/constants';
import { Prisma } from '@prisma/client';

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

  @ApiProperty({ example: 4.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'https://forspoken.square-enix-games.com/en-us/' })
  @IsUrl()
  @IsOptional()
  website: string;

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
  platforms: IdNameSlug[];

  @ApiProperty({
    example: [
      {
        id: '1f556ab5-4b96-4c1f-a38b-95b7545efa67',
        name: 'Action',
        slug: 'action',
      },
    ],
  })
  @IsArray()
  genres: IdNameSlug[];

  @ApiProperty({
    example: [
      {
        id: '2474a226-ac3b-4b2f-a79c-70da86885af2',
        name: 'Luminous Productions',
        slug: 'luminous-productions',
      },
    ],
  })
  @IsArray()
  developers: IdNameSlug[];

  @ApiProperty({
    example: [
      {
        id: '95d74c6b-5644-4dc5-8f08-fec05643703f',
        name: 'Square Enix',
        slug: 'square-enix',
      },
    ],
  })
  @IsArray()
  publishers: IdNameSlug[];

  @ApiProperty({
    example: [
      {
        id: '0b727b89-e8e0-4183-a4aa-50686040f47e',
        image_url:
          'https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg',
      },
    ],
  })
  @IsArray()
  screenshots: { id: string; image_url: string }[];
}

export class ResponseGamesDto {
  @ApiProperty({
    example: { added: 15000, id: '0b727b89-e8e0-4183-a4aa-50686040f47e' },
  })
  @IsObject()
  cursor: Prisma.GameWhereUniqueInput;

  @ApiProperty({
    type: [GameDto],
  })
  @IsArray()
  data: GameDto[];
}

export class GetGamesDto {
  @ApiPropertyOptional({ enum: GamesOrderBy })
  @IsString()
  @IsOptional()
  ordering?: GamesOrderBy;

  @ApiPropertyOptional({ example: '3fd6ed32-91df-4e80-a0bc-3b737629b8ed' })
  @IsString()
  @IsOptional()
  platform_id?: string;

  @ApiPropertyOptional({ example: 'a8012df2-e744-4d84-bb0a-58feccb8603a' })
  @IsString()
  @IsOptional()
  genre_id?: string;

  @ApiPropertyOptional({ example: ['2018-01-26', '2020-12-10'] })
  @IsArray()
  @IsOptional()
  dates?: string[];

  @ApiPropertyOptional({
    example: { name: 'Forspoken', id: 'b86fa12a-76fc-46f5-8a3e-bf39e7be4c4e' },
  })
  @IsObject()
  @IsOptional()
  cursor?: Prisma.GameWhereUniqueInput;
}

export class CreateGameDto {
  @ApiProperty({ example: 'Forspoken' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'forspoken' })
  @IsString()
  @IsOptional()
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

  @ApiProperty({ example: '2023-10-31T04:50:07.398Z' })
  @IsString()
  released: string;

  @ApiProperty({ example: 'https://forspoken.square-enix-games.com/en-us/' })
  @IsUrl()
  @IsOptional()
  website: string;

  @ApiProperty({
    example: ['Luminous Productions'],
  })
  @IsArray()
  developers: string[];

  @ApiProperty({
    example: ['Square Enix'],
  })
  @IsArray()
  publishers: string[];

  @ApiProperty({
    example: [
      'https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg',
    ],
  })
  @IsArray()
  screenshots: string[];

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
