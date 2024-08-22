import { Injectable } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class CookieService {
  private readonly REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
  private readonly REFRESH_TOKEN_EXPIRY = 21600 * 900000;

  setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie(this.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + this.REFRESH_TOKEN_EXPIRY),
      signed: true,
    });
  }

  getRefreshTokenFromRequest(req: Request): string | null {
    let refreshToken = req.signedCookies[this.REFRESH_TOKEN_COOKIE_NAME];
    if (!refreshToken && req.body[this.REFRESH_TOKEN_COOKIE_NAME]) {
      refreshToken = req.body[this.REFRESH_TOKEN_COOKIE_NAME];
    }
    return refreshToken;
  }

  clearRefreshTokenCookie(res: Response): void {
    res.clearCookie(this.REFRESH_TOKEN_COOKIE_NAME);
  }
}
