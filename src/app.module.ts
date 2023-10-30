import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule],
})
export class AppModule {}
