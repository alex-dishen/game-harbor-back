import { Injectable } from '@nestjs/common';
import { IdName } from 'src/shared/types';
import { GameDto } from 'src/api/games/dto';

type Game = {
  id: string;
  name: string;
  background_image: string;
  description_raw: string;
  released: string;
  website: string;
  developers: string[];
  publishers: string[];
  platforms: { platform: IdName & { slug: string } }[];
  genres: { genre: IdName }[];
};

@Injectable()
export class GamesMapper {
  constructor() {}

  toDto(game: Game): GameDto {
    return {
      ...game,
      platforms: game.platforms.map((platform) => platform.platform),
      genres: game.genres.map((genre) => genre.genre),
    };
  }

  toArrayDto(games: Game[]): GameDto[] {
    return games.map((game) => this.toDto(game));
  }
}
