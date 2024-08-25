import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { Types } from 'mongoose';
import { RedisService } from '../redis/redis.service';
import { getRefreshTokenKey } from './helpers/get-refresh-token-key';

@Injectable()
export class AuthRepository {
  constructor(private redisService: RedisService) {}

  getUserSessionById(
    userId: string,
    sessionId: string,
  ): Promise<string | null> {
    const refreshTokenKey = getRefreshTokenKey(userId, sessionId);

    return this.redisService.get(refreshTokenKey);
  }

  async createOrUpdateUserSession(
    userId: string,
    sessionId: string | Types.ObjectId,
    token: string,
    expiresInSeconds: number,
  ): Promise<void> {
    const hashedToken = await hash(token);
    const refreshTokenKey = getRefreshTokenKey(userId, sessionId.toString());

    await this.redisService.set(refreshTokenKey, hashedToken, expiresInSeconds);
  }

  async deleteUserSession(userId: string, sessionId: string): Promise<void> {
    const refreshTokenKey = getRefreshTokenKey(userId, sessionId);

    await this.redisService.del(refreshTokenKey);
  }
}
