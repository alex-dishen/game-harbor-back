import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MessageDto {
  @ApiProperty({
    example: 'The operation is successful',
    description: 'Message',
  })
  @IsString()
  message: string;
}
