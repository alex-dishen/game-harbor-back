import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class GamesRepository {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.game.findMany({
      include: {
        platforms: { include: { platform: true } },
        genres: { include: { genre: true } },
      },
    });
  }

  getById(where: Prisma.GameWhereUniqueInput) {
    return this.prisma.game.findUnique({
      where,
      include: {
        platforms: { include: { platform: true } },
        genres: { include: { genre: true } },
      },
    });
  }

  create(data: Prisma.GameCreateInput) {
    return this.prisma.game.create({
      data,
      include: {
        platforms: { include: { platform: true } },
        genres: { include: { genre: true } },
      },
    });
  }

  async delete(where: Prisma.GameWhereUniqueInput) {
    await this.prisma.gamePlatforms.deleteMany({
      where: { game_id: where.id },
    });

    await this.prisma.gameGenres.deleteMany({ where: { game_id: where.id } });

    return this.prisma.game.delete({ where });
  }
}
