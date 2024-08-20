import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { JwtResponseDto, SignUpDto, SingInDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadT } from './types/types';
import { EnvVariable } from 'src/shared/types/env';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  private async createJwtToken(userId: string): Promise<string> {
    const payload: JwtPayloadT = { sub: userId };
    const secret = this.config.get(EnvVariable.JWT_SECRET);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '1h',
    });

    return accessToken;
  }

  async signUp(data: SignUpDto): Promise<JwtResponseDto> {
    const createdUser = await this.userRepository.create(data);
    const accessToken = await this.createJwtToken(createdUser.id);

    return { accessToken };
  }

  async signIn(data: SingInDto): Promise<JwtResponseDto> {
    const user = await this.userRepository.getBy({ email: data.email });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const passwordsMatch = await verify(user.password, data.password);

    if (!passwordsMatch) throw new ForbiddenException('Credentials incorrect');

    const accessToken = await this.createJwtToken(user.id);

    return { accessToken };
  }
}
