import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class GamesRepository {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.game.findMany({
      include: {
        parent_platforms: { include: { platform: true } },
        genres: { include: { genre: true } },
        developers: { include: { developer: true } },
        publishers: { include: { publisher: true } },
      },
    });
  }

  getBy(where: Prisma.GameWhereUniqueInput) {
    return this.prisma.game.findUnique({
      where,
      include: {
        parent_platforms: { include: { platform: true } },
        genres: { include: { genre: true } },
        developers: { include: { developer: true } },
        publishers: { include: { publisher: true } },
      },
    });
  }

  create(data: Prisma.GameCreateInput) {
    return this.prisma.game.create({
      data,
      include: {
        parent_platforms: { include: { platform: true } },
        genres: { include: { genre: true } },
      },
    });
  }

  async delete(where: Prisma.GameWhereUniqueInput) {
    await this.prisma.gamePlatform.deleteMany({
      where: { game_id: where.id },
    });

    await this.prisma.gameGenre.deleteMany({ where: { game_id: where.id } });

    await this.prisma.gameDeveloper.deleteMany({
      where: { game_id: where.id },
    });

    await this.prisma.gamePublisher.deleteMany({
      where: { game_id: where.id },
    });

    return this.prisma.game.delete({ where });
  }
}
