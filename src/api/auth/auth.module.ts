import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { CookieService } from './cookie.service';
import { TokenService } from './token.service';

@Module({
  imports: [UserModule, JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [AuthRepository, AuthService, CookieService, TokenService],
})
export class AuthModule {}
