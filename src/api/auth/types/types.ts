export type JwtPayloadT = {
  sub: string;
};

export type CreateTokensResponse = {
  accessToken: string;
  refreshToken: string;
  refreshExpiresAt: Date;
};
