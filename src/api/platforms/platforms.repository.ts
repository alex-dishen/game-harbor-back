import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class PlatformsRepository {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.platform.findMany();
  }

  getBy(where: Prisma.PlatformWhereUniqueInput) {
    return this.prisma.platform.findUnique({ where });
  }

  create(data: Prisma.PlatformCreateInput) {
    return this.prisma.platform.create({ data });
  }

  update(params: {
    where: Prisma.PlatformWhereUniqueInput;
    data: Prisma.PlatformCreateInput;
  }) {
    return this.prisma.platform.update(params);
  }

  delete(where: Prisma.PlatformWhereUniqueInput) {
    return this.prisma.$transaction([
      this.prisma.gamePlatform.deleteMany({ where: { platform_id: where.id } }),
      this.prisma.platform.delete({ where }),
    ]);
  }
}
