import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'User password',
  })
  @IsString()
  password: string;
}

export class SignUpDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'User password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'Oleksandr',
    description: 'User first name',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Didyshen',
    description: 'User last name',
  })
  @IsString()
  lastName: string;
}
