import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RawgAllGamesResponse, RawgGameResponse } from '../types';
import { getPrice } from '../helpers';

@Injectable()
export class IntegrationMapper {
  constructor() {}

  shapeData(allGames: RawgAllGamesResponse, gameDetails: RawgGameResponse[]) {
    return allGames.results.map((game) => {
      const matchedGame = gameDetails.find(
        (gameDetail) => game.id === gameDetail.id,
      );

      const fullGame = { ...game, ...matchedGame };

      const shapedGame: Prisma.GameCreateInput = {
        name: fullGame.name,
        slug: fullGame.slug,
        background_image: fullGame.background_image,
        description_raw: fullGame.description_raw,
        description: fullGame.description,
        released: fullGame.released,
        website: fullGame.website,
        price: getPrice(game.added),
        added: fullGame.added,
        rating: fullGame.rating,
        updated: fullGame.updated,
        platforms: {
          create: fullGame.parent_platforms.map(
            ({ platform: { name, slug } }) => ({
              platform: {
                connectOrCreate: {
                  where: { name: name },
                  create: { name, slug },
                },
              },
            }),
          ),
        },
        genres: {
          create: fullGame.genres.map(({ name, slug }) => ({
            genre: {
              connectOrCreate: {
                where: { name: name },
                create: { name, slug },
              },
            },
          })),
        },
        developers: {
          create: fullGame.developers.map(({ name, slug }) => ({
            developer: {
              connectOrCreate: {
                where: { name: name },
                create: { name, slug },
              },
            },
          })),
        },
        publishers: {
          create: fullGame.publishers.map(({ name, slug }) => ({
            publisher: {
              connectOrCreate: {
                where: { name: name },
                create: { name, slug },
              },
            },
          })),
        },
        screenshots: {
          create: fullGame.short_screenshots.map(({ image }) => ({
            image_url: image,
          })),
        },
      };

      return shapedGame;
    });
  }
}
