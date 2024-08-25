import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSession, UserSessionSchema } from 'schemas/user-session.schema';
import { AuthRepository } from './auth.repository';
import { CookieService } from './cookie.service';
import { TokenService } from './token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSession.name, schema: UserSessionSchema },
    ]),
    UserModule,
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
  providers: [AuthRepository, AuthService, CookieService, TokenService],
})
export class AuthModule {}
