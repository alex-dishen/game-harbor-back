import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDto, SignUpDto } from './dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: SignUpDto) {
    const hash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: { ...dto, password: hash },
    });

    return user;
  }

  signIn(dto: SignInDto) {
    return { message: "I've signed in" };
  }
}
