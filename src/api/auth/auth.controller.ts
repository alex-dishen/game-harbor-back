import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageDto } from '../../shared/dto';
import { SignInDto, SignUpDto } from './dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @ApiOperation({ summary: 'Sign in to the app' })
  @ApiResponse({ status: 200, type: MessageDto })
  @Post('signin')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
