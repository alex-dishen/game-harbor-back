import { Injectable } from '@nestjs/common';
import { GameDto } from 'src/api/games/dto';
import { omit } from 'src/shared/helpers';
import { Game } from 'src/api/games/types';

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
