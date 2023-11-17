import { Module } from '@nestjs/common';
import { AuthModule } from 'src/api/auth/auth.module';
import { UserModule } from 'src/api/user/user.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { GamesModule } from 'src/api/games/games.module';
import { MappersModule } from 'src/shared/mappers/mapper.module';
import { PlatformsModule } from 'src/api/platforms/platforms.module';
import { GenresModule } from 'src/api/genres/genres.module';
import { IntegrationModule } from 'src/api/integration/integration.module';
import { TimeModule } from './shared/time/time.module';
import { DevelopersModule } from './api/developers/developers.module';

@Module({
  imports: [
    PrismaModule,
    TimeModule,
    AuthModule,
    UserModule,
    GamesModule,
    MappersModule,
    PlatformsModule,
    GenresModule,
    DevelopersModule,
    IntegrationModule,
  ],
})
export class AppModule {}
