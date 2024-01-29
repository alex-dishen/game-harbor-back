import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class IdNameDto {
  @ApiProperty({ example: 'b86fa12a-76fc-46f5-8a3e-bf39e7be4c4e' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Example name' })
  @IsString()
  name: string;
}
