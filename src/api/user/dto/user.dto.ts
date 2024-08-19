import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Types } from 'mongoose';
import { Match } from 'src/shared/decorators/match.decorator';

export class UserDto {
  @ApiProperty({ example: 'as234asd1234', description: 'Users id' })
  _id?: Types.ObjectId;

  @ApiProperty({ example: 'John', description: 'Users first name' })
  firstName: string;

  @ApiProperty({ example: 'Smith', description: 'Users last name' })
  lastName: string;

  @ApiProperty({ example: 'john.smith@gmail.com', description: 'Users email' })
  email: string;

  @ApiProperty({ example: '+390974356183', description: 'Users phone number' })
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: '024-08-14T12:34:56.789Z',
    description: 'The date when user was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: false,
    description: 'Describes if user was deleted',
  })
  isDeleted: boolean;
}

export class CreateUserDto {
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
  @Match<CreateUserDto>('password', { message: 'Passwords do not match' })
  confirmationPassword: string;

  @ApiProperty({ example: 'john.smith@gmail.com', description: 'Users email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+390974356183', description: 'Users phone number' })
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'John', description: 'Users first name' })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'Smith', description: 'Users last name' })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ example: 'qwertY098!', description: 'Users password' })
  @IsStrongPassword()
  @IsOptional()
  password: string;

  @ApiProperty({ example: 'john.smith@gmail.com', description: 'Users email' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: '+390974356183', description: 'Users phone number' })
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
