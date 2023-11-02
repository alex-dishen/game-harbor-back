import { PrismaClient } from '@prisma/client';
import { seedData } from '../helpers';
import { gameGenres, gamePlatforms, games } from '../seed-data';

export const seedGame = async (prisma: PrismaClient) => {
  await seedData(prisma, 'game', games);

  await seedData(prisma, 'gamePlatforms', gamePlatforms);

  await seedData(prisma, 'gameGenres', gameGenres);
};
