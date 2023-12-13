import { Prisma } from '@prisma/client';
import { GamesOrderBy, OrderByOptions } from 'src/api/games/constants';
import { Game } from 'src/api/games/types';

export const generateCursor = (ordering: GamesOrderBy, game: Game) => {
  const orderByOption = OrderByOptions[ordering];

  return orderByOption.reduce((cursor, criteria) => {
    return {
      ...cursor,
      ...Object.keys(criteria).reduce(
        (obj, key) => ({ ...obj, [key]: game[key] }),
        {},
      ),
    };
  }, {}) as Prisma.GameWhereUniqueInput;
};
