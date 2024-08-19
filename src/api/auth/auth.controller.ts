import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { SignInResponseDto, SignUpDto, SingInDto } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, type: UserDto })
  @Post('/sign-up')
  async signUp(@Body() data: SignUpDto): Promise<UserDto> {
    return this.authService.signUp(data);
  }

  @ApiOperation({ summary: 'Sign in into the system' })
  @ApiResponse({ status: 200, type: SignInResponseDto })
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(@Body() data: SingInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(data);
  }
}
