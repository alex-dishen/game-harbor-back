import { PrismaClient } from '@prisma/client';
import { genres, platforms } from './seed-data';

const prisma = new PrismaClient();

const seedData = <T extends { id: string }>(
  data: T[],
  model: keyof PrismaClient,
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

async function main() {
  await seedData(genres, 'genre');

  await seedData(platforms, 'platform');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
