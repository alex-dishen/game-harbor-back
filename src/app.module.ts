import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './api/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { EnvVariable } from './shared/types/env';
import { RedisModule } from './api/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env[EnvVariable.DATABASE_URL]),
    RedisModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
