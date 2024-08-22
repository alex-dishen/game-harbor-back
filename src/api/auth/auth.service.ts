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
import { CreateTokensResponse, JwtPayloadT } from './types/types';
import { EnvVariable } from 'src/shared/types/env';
import { AuthRepository } from './auth.repository';
import dayjs from 'dayjs';
import { MessageDto } from 'src/shared/dto/message.dto';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) {}

  private async createTokens(
    userId: string,
    sessionId: Types.ObjectId,
  ): Promise<CreateTokensResponse> {
    const accessTokenPayLoad: JwtPayloadT = { sub: userId };
    const refreshTokenPayload: JwtPayloadT = { sub: sessionId.toString() };
    const accessSecret = this.config.get(EnvVariable.ACCESS_SECRET);
    const refreshSecret = this.config.get(EnvVariable.REFRESH_SECRET);

    const accessExpiry = '1h';
    const refreshExpiry = '10d';

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessTokenPayLoad, {
        secret: accessSecret,
        expiresIn: accessExpiry,
      }),
      this.jwtService.signAsync(refreshTokenPayload, {
        secret: refreshSecret,
        expiresIn: refreshExpiry,
      }),
    ]);

    const decodedRefreshToken = await this.jwtService.decode(refreshToken);

    let refreshExpiresAt = dayjs().add(10, 'days').toDate();

    if (decodedRefreshToken?.exp) {
      refreshExpiresAt = new Date(decodedRefreshToken.exp * 1000);
    }

    return { accessToken, refreshToken, refreshExpiresAt };
  }

  async signUp(data: SignUpDto): Promise<AuthDto> {
    const createdUser = await this.userRepository.create(data);
    const sessionsId = new Types.ObjectId();
    const { accessToken, refreshToken, refreshExpiresAt } =
      await this.createTokens(createdUser.id, sessionsId);

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
      await this.createTokens(user.id, sessionsId);

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

    const decoded = await this.jwtService.decode(refreshToken);
    const sessionId = decoded['sub'];

    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.config.get(EnvVariable.REFRESH_SECRET),
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        await this.authRepository.deleteUserSession(sessionId);

        throw new UnauthorizedException({
          message: 'JWT token is no longer valid',
        });
      }

      console.log(error);
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
    } = await this.createTokens(userId, sessionId);

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
