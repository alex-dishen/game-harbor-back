import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class PublishersRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.PublisherCreateInput) {
    return this.prisma.publisher.create({ data });
  }

  getAll() {
    return this.prisma.publisher.findMany();
  }

  getBy(where: Prisma.PublisherWhereUniqueInput) {
    return this.prisma.publisher.findUnique({ where });
  }

  update(params: {
    where: Prisma.PublisherWhereUniqueInput;
    data: Prisma.PublisherCreateInput;
  }) {
    return this.prisma.publisher.update(params);
  }

  delete(where: Prisma.PublisherWhereUniqueInput) {
    return this.prisma.$transaction([
      this.prisma.gamePublisher.deleteMany({
        where: { publisher_id: where.id },
      }),
      this.prisma.publisher.delete({ where }),
    ]);
  }
}
