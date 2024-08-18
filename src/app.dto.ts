import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePhraseAndPlanet {
  @ApiProperty({
    example: 'Hello',
    description: 'Phrase user added to the planet earlier',
  })
  @IsString()
  phrase: string;

  @ApiProperty({ example: 'Earth', description: 'Planet name' })
  @IsString()
  planet: string;
}

export class AppDto {
  @ApiProperty({
    example: 'Hello',
    description: 'Phrase user added to the planet earlier',
  })
  @IsString()
  phrase: string;

  @ApiProperty({ example: 'Earth', description: 'Planet name' })
  @IsString()
  planet: string;
}
