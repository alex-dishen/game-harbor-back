import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  password: string;
}

export class SignUpDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'Oleksandr' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Didyshen' })
  @IsString()
  lastName: string;
}
