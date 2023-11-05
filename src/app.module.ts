import { Module } from '@nestjs/common';
import { AuthModule } from 'src/api/auth/auth.module';
import { UserModule } from 'src/api/user/user.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { GamesModule } from 'src/api/games/games.module';
import { MappersModule } from 'src/shared/mappers/mapper.module';
import { PlatformsModule } from 'src/api/platforms/platforms.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    GamesModule,
    MappersModule,
    PlatformsModule,
  ],
})
export class AppModule {}
