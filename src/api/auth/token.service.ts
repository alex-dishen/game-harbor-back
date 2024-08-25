import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateTokensResponse, JwtPayloadT } from './types/types';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from 'src/shared/types/env';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';

@Injectable()
export class TokenService {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}

  async createTokens(
    userId: string,
    sessionId: Types.ObjectId | string,
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

    const expirationTime = dayjs.unix(
      decodedRefreshToken?.exp || new Date(decodedRefreshToken.exp * 1000),
    );

    const currentTime = dayjs();

    const expiresIn = expirationTime.diff(currentTime, 'second');

    return { accessToken, refreshToken, refreshExpiresIn: expiresIn };
  }

  verifyRefreshToken(token: string): Promise<JwtPayloadT> {
    return this.jwtService.verifyAsync(token, {
      secret: this.config.get(EnvVariable.REFRESH_SECRET),
    });
  }

  decodeToken(token: string): Promise<JwtPayloadT> {
    return this.jwtService.decode<Promise<JwtPayloadT>>(token);
  }
}
