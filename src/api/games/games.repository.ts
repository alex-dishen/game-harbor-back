import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { GamesOrderBy, OrderByOptions } from 'src/api/games/constants';

@Injectable()
export class GamesRepository {
  constructor(private prisma: PrismaService) {}

  getAll(
    params: {
      skip: number;
      orderBy: GamesOrderBy;
      cursor: Prisma.GameWhereUniqueInput;
    },
    where: Prisma.GameWhereInput,
  ) {
    return this.prisma.game.findMany({
      where,
      take: 20,
      skip: params.skip,
      orderBy: OrderByOptions[params.orderBy],
      cursor: params.cursor,
      include: {
        platforms: { include: { platform: true } },
        genres: { include: { genre: true } },
        developers: { include: { developer: true } },
        publishers: { include: { publisher: true } },
        screenshots: true,
      },
    });
  }

  getBy(where: Prisma.GameWhereUniqueInput) {
    return this.prisma.game.findUnique({
      where,
      include: {
        platforms: { include: { platform: true } },
        genres: { include: { genre: true } },
        developers: { include: { developer: true } },
        publishers: { include: { publisher: true } },
        screenshots: true,
      },
    });
  }

  create(data: Prisma.GameCreateInput) {
    return this.prisma.game.create({ data });
  }

  delete(where: Prisma.GameWhereUniqueInput) {
    return this.prisma.$transaction([
      this.prisma.gameGenre.deleteMany({ where: { game_id: where.id } }),
      this.prisma.gamePlatform.deleteMany({ where: { game_id: where.id } }),
      this.prisma.gameDeveloper.deleteMany({ where: { game_id: where.id } }),
      this.prisma.gamePublisher.deleteMany({ where: { game_id: where.id } }),
      this.prisma.screenshot.deleteMany({ where: { game_id: where.id } }),
      this.prisma.game.delete({ where }),
    ]);
  }
}
