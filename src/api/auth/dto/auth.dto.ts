import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Match } from 'src/shared/decorators/match.decorator';

export class SignUpDto {
  @ApiProperty({ example: 'John', description: 'Users first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Smith', description: 'Users last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'qwertY098!', description: 'Users password' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'qwertY098!',
    description:
      'Duplicated password to confirm the correctness of the password',
  })
  @IsStrongPassword()
  @Match<SignUpDto>('password', { message: 'Passwords do not match' })
  confirmationPassword: string;

  @ApiProperty({ example: 'john.smith@gmail.com', description: 'Users email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+390974356183', description: 'Users phone number' })
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}

export class SingInDto {
  @ApiProperty({ example: 'john.smith@gmail.com', description: 'Users email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qwertY098!', description: 'Users password' })
  @IsString()
  password: string;
}

export class SignInResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'Access token that allows user to access the app',
  })
  accessToken: string;
}
