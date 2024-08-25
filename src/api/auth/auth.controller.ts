import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AccessTokenDto, SignUpDto, SingInDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { CookieService } from './cookie.service';
import { MessageDto } from 'src/shared/dto/message.dto';
import { JwtAuthGuard } from './guard/jwt.guard';
import { GetUser } from 'src/shared/decorators/get-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, type: AccessTokenDto })
  @Post('/sign-up')
  async signUp(
    @Body() data: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenDto> {
    const authResult = await this.authService.signUp(data);
    this.cookieService.setRefreshTokenCookie(res, authResult.refreshToken);

    return { accessToken: authResult.accessToken };
  }

  @ApiOperation({ summary: 'Sign in into the system' })
  @ApiResponse({ status: 200, type: AccessTokenDto })
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(
    @Body() data: SingInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenDto> {
    const authResult = await this.authService.signIn(data);
    this.cookieService.setRefreshTokenCookie(res, authResult.refreshToken);

    return { accessToken: authResult.accessToken };
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, type: AccessTokenDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @GetUser('sub') userId: string,
  ): Promise<AccessTokenDto> {
    const refreshToken = this.cookieService.getRefreshTokenFromRequest(req);
    const authResult = await this.authService.refreshAccessToken(
      userId,
      refreshToken,
    );
    this.cookieService.setRefreshTokenCookie(res, authResult.refreshToken);

    return { accessToken: authResult.accessToken };
  }

  @ApiOperation({ summary: 'Logout a user from the system' })
  @ApiResponse({ status: 200, type: MessageDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @GetUser('sub') userId: string,
  ): Promise<MessageDto> {
    const refreshToken = this.cookieService.getRefreshTokenFromRequest(req);
    const logOutResponse = await this.authService.logout(userId, refreshToken);
    this.cookieService.clearRefreshTokenCookie(res);

    return logOutResponse;
  }
}
