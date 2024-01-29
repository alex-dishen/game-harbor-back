import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class GenresDto {
  @ApiProperty({ example: '1f556ab5-4b96-4c1f-a38b-95b7545efa67' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Action' })
  @IsString()
  name: string;
}

export class CreateGenresDto extends OmitType(GenresDto, ['id']) {}
