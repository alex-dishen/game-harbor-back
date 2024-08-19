import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UserDto } from '../user/dto/user.dto';
import { SignInResponseDto, SignUpDto, SingInDto } from './dto/auth.dto';
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

  signUp(data: SignUpDto): Promise<UserDto> {
    return this.userRepository.create(data);
  }

  async signIn(data: SingInDto): Promise<SignInResponseDto> {
    const user = await this.userRepository.getBy({ email: data.email });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const passwordsMatch = await verify(user.password, data.password);

    if (!passwordsMatch) throw new ForbiddenException('Credentials incorrect');

    const payload: JwtPayloadT = {
      sub: user._id.toString(),
      email: user.email,
    };
    const secret = this.config.get(EnvVariable.JWT_SECRET);
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret,
    });

    return { accessToken };
  }
}
