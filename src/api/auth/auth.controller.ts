import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtResponseDto, SignUpDto, SingInDto } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, type: JwtResponseDto })
  @Post('/sign-up')
  async signUp(@Body() data: SignUpDto): Promise<JwtResponseDto> {
    return this.authService.signUp(data);
  }

  @ApiOperation({ summary: 'Sign in into the system' })
  @ApiResponse({ status: 200, type: JwtResponseDto })
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(@Body() data: SingInDto): Promise<JwtResponseDto> {
    return this.authService.signIn(data);
  }
}
