import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID, IsUrl } from 'class-validator';
import { IdNameDto } from 'src/shared/dto';

export class GameDto {
  @ApiProperty({ example: 'b86fa12a-76fc-46f5-8a3e-bf39e7be4c4e' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Forspoken' })
  @IsString()
  name: string;

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

  @ApiProperty({ example: ['Luminous Productions'] })
  @IsArray()
  developers: string[];

  @ApiProperty({ example: ['Square Enix'] })
  @IsArray()
  publishers: string[];

  @ApiProperty({
    example: [
      {
        id: 'b86fa12a-76fc-46f5-8a3e-bf39e7be4c4e',
        name: 'Play Station',
        slug: 'play station',
      },
    ],
  })
  @IsArray()
  platforms: [{ slug: string } & IdNameDto];

  @ApiProperty({
    example: [{ id: 'b86fa12a-76fc-46f5-8a3e-bf39e7be4c4e', name: 'Action' }],
  })
  @IsArray()
  genres: IdNameDto[];

  @ApiProperty({ example: 'https://forspoken.square-enix-games.com/en-us/' })
  @IsUrl()
  website: string;
}

export class CreateGameDto extends OmitType(GameDto, ['platforms', 'genres']) {
  @ApiProperty({ example: '3bbcc041-775e-4053-a509-6b5f763f3624' })
  @IsString()
  platformId: string;
}
