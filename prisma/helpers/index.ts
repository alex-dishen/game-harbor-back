import { PrismaClient } from '@prisma/client';

export const seedData = async <T extends { id: string }>(
  prisma: PrismaClient,
  model: keyof PrismaClient,
  data: T[],
) => {
  const modelName = model as string;

  return Promise.all(
    data.map((item) =>
      prisma[modelName].upsert({
        where: { id: item.id },
        update: item,
        create: item,
      }),
    ),
  );
};
