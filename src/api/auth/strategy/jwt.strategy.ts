import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtName, JwtPayloadT } from '../types/types';
import { UserRepository } from 'src/api/user/user.repository';
import { EnvVariable } from 'src/shared/types/env';
import { UserDocumentWithoutPassword } from 'schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JwtName.JWT) {
  constructor(
    config: ConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(EnvVariable.JWT_SECRET),
    });
  }

  validate(payload: JwtPayloadT): Promise<UserDocumentWithoutPassword> {
    return this.userRepository.getById(payload.sub);
  }
}
