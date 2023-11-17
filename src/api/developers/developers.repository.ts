import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class DevelopersRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.DeveloperCreateInput) {
    return this.prisma.developer.create({ data });
  }

  getAll() {
    return this.prisma.developer.findMany();
  }

  getBy(where: Prisma.DeveloperWhereUniqueInput) {
    return this.prisma.developer.findUnique({ where });
  }

  update(params: {
    where: Prisma.DeveloperWhereUniqueInput;
    data: Prisma.DeveloperCreateInput;
  }) {
    return this.prisma.developer.update(params);
  }

  delete(where: Prisma.DeveloperWhereUniqueInput) {
    return this.prisma.$transaction([
      this.prisma.gameDeveloper.deleteMany({
        where: { developer_id: where.id },
      }),
      this.prisma.developer.delete({ where }),
    ]);
  }
}
