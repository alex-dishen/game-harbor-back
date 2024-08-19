export type JwtPayloadT = {
  sub: string;
  email: string;
};

export enum JwtName {
  JWT = 'jwt',
}
