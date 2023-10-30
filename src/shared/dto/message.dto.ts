import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MessageDto {
  @ApiProperty({ example: 'Have a nice day', description: 'Message' })
  @IsString({ message: 'must be string' })
  message: string;
}
