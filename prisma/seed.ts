import { PrismaClient } from '@prisma/client';
import {
  developers,
  genres,
  platforms,
  publishers,
  screenshots,
} from './seed-data';
import { seedData } from './helpers';
import { seedGame } from './seeds';

const prisma = new PrismaClient();

async function main() {
  await seedData(prisma, 'genre', genres);

  await seedData(prisma, 'platform', platforms);

  await seedData(prisma, 'developer', developers);

  await seedData(prisma, 'publisher', publishers);

  await seedGame(prisma);

  await seedData(prisma, 'screenshot', screenshots);
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
