import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}
}
