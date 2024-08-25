import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { AuthDto, SignUpDto, SingInDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './auth.repository';
import { MessageDto } from 'src/shared/dto/message.dto';
import { Types } from 'mongoose';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) {}

  async signUp(data: SignUpDto): Promise<AuthDto> {
    const createdUser = await this.userRepository.create(data);
    const sessionsId = new Types.ObjectId();
    const { accessToken, refreshToken, refreshExpiresAt } =
      await this.tokenService.createTokens(createdUser.id, sessionsId);

    await this.authRepository.createUserSession(
      sessionsId,
      refreshToken,
      createdUser.id,
      refreshExpiresAt,
    );

    return { accessToken, refreshToken };
  }

  async signIn(data: SingInDto): Promise<AuthDto> {
    const user = await this.userRepository.getBy({ email: data.email });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const passwordsMatch = await verify(user.password, data.password);

    if (!passwordsMatch) throw new ForbiddenException('Credentials incorrect');

    const sessionsId = new Types.ObjectId();
    const { accessToken, refreshToken, refreshExpiresAt } =
      await this.tokenService.createTokens(user.id, sessionsId);

    await this.authRepository.createUserSession(
      sessionsId,
      refreshToken,
      user.id,
      refreshExpiresAt,
    );

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(
    userId: string,
    refreshToken?: string,
  ): Promise<AuthDto> {
    if (!refreshToken)
      throw new UnauthorizedException('Refresh token not found');

    const decoded = await this.tokenService.decodeToken(refreshToken);
    const sessionId = decoded['sub'];

    try {
      await this.tokenService.verifyRefreshToken(refreshToken);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        await this.authRepository.deleteUserSession(sessionId);

        throw new UnauthorizedException({
          message: 'JWT token is no longer valid',
        });
      }

      throw new UnauthorizedException({
        message: error.message,
      });
    }

    const userSession = await this.authRepository.getUserSessionById(sessionId);

    if (!userSession) throw new ForbiddenException('Access denied');

    const refreshTokenMatch = await verify(userSession.token, refreshToken);

    if (!refreshTokenMatch) throw new ForbiddenException('Access denied');

    const {
      accessToken,
      refreshToken: newRefreshToken,
      refreshExpiresAt,
    } = await this.tokenService.createTokens(userId, sessionId);

    await this.authRepository.updateUserSession(sessionId, {
      token: newRefreshToken,
      expiresAt: refreshExpiresAt,
    });

    return {
      accessToken: accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshToken?: string): Promise<MessageDto> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const decoded = await this.jwtService.decode(refreshToken);
    const sessionId = decoded['sub'];

    await this.authRepository.deleteUserSession(sessionId);

    return { message: 'Successfully logged out' };
  }
}
