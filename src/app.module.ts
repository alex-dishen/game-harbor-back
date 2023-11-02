import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { GamesModule } from './api/games/games.module';
import { MappersModule } from './shared/mappers/mapper.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, GamesModule, MappersModule],
})
export class AppModule {}
