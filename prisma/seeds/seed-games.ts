import { PrismaClient } from '@prisma/client';
import { seedData } from '../helpers';
import {
  gameDevelopers,
  gameGenres,
  gamePlatforms,
  gamePublishers,
  games,
} from '../seed-data';

export const seedGame = async (prisma: PrismaClient) => {
  await seedData(prisma, 'game', games);

  await seedData(prisma, 'gamePlatform', gamePlatforms);

  await seedData(prisma, 'gameGenre', gameGenres);

  await seedData(prisma, 'gameDeveloper', gameDevelopers);

  await seedData(prisma, 'gamePublisher', gamePublishers);
};
