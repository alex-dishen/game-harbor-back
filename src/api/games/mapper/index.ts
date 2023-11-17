import { Injectable } from '@nestjs/common';
import { IdNameSlug } from 'src/shared/types';
import { GameDto } from 'src/api/games/dto';
import { omit } from 'src/shared/helpers';

type Game = {
  id: string;
  name: string;
  background_image: string;
  description_raw: string;
  slug: string;
  description: string;
  added: number;
  rating: number;
  updated: Date;
  released: string;
  website: string;
  price: number;
  created_at: Date;
  developers: { developer: IdNameSlug }[];
  publishers: { publisher: IdNameSlug }[];
  platforms: { platform: IdNameSlug & { slug: string } }[];
  genres: { genre: IdNameSlug }[];
  screenshots: { id: string; image_url: string; game_id: string }[];
};

@Injectable()
export class GamesMapper {
  constructor() {}

  toDto(game: Game): GameDto {
    return {
      ...omit(game, ['updated', 'added', 'rating', 'created_at']),
      platforms: game.platforms.map((platform) => platform.platform),
      genres: game.genres.map((genre) => genre.genre),
      developers: game.developers.map((developer) => developer.developer),
      publishers: game.publishers.map((publisher) => publisher.publisher),
      screenshots: game.screenshots.map(({ id, image_url }) => ({
        id,
        image_url,
      })),
    };
  }

  toArrayDto(games: Game[]): GameDto[] {
    return games.map((game) => this.toDto(game));
  }
}
