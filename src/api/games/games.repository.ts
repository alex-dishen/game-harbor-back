import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class GamesRepository {
  constructor(private prisma: PrismaService) {}

  getAll(where: Prisma.GameWhereInput) {
    return this.prisma.game.findMany({ where });
  }

  get(where: Prisma.GameWhereUniqueInput) {
    return this.prisma.game.findUnique({ where });
  }

  create(data: Prisma.GameCreateInput) {
    return this.prisma.game.create({ data });
  }

  delete(where: Prisma.GameWhereUniqueInput) {
    return this.prisma.game.delete({ where });
  }
}
