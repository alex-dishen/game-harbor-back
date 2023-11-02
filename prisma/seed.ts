import { PrismaClient } from '@prisma/client';
import { genres, platforms } from './seed-data';
import { seedData } from './helpers';
import { seedGame } from './seeds';

const prisma = new PrismaClient();

async function main() {
  await seedData(prisma, 'genre', genres);

  await seedData(prisma, 'platform', platforms);

  await seedGame(prisma);
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
