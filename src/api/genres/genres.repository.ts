import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class GenresRepository {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.genre.findMany();
  }

  getBy(where: Prisma.GenreWhereUniqueInput) {
    return this.prisma.genre.findUnique({ where });
  }

  create(data: Prisma.GenreCreateInput) {
    return this.prisma.genre.create({ data });
  }

  update(params: {
    where: Prisma.GenreWhereUniqueInput;
    data: Prisma.GenreCreateInput;
  }) {
    return this.prisma.genre.update(params);
  }

  delete(where: Prisma.GenreWhereUniqueInput) {
    return this.prisma.genre.delete({ where });
  }
}
