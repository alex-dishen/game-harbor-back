import { IdNameSlug } from 'src/shared/types';

type AddedByStatus = {
  yet?: number;
  owned?: number;
  beaten?: number;
  toplay?: number;
  dropped?: number;
  playing?: number;
};

type OrderingOptions =
  | 'name'
  | 'released'
  | 'added'
  | 'created'
  | 'updated'
  | 'rating'
  | 'metacritic';

type PrefixedOrderingOptions<T extends string> = `-${T}`;

export type RawgQueryParameters = {
  page: number;
  tags: string;
  dates: string;
  stores: string;
  search: string;
  updated: string;
  creators: string;
  platforms: string;
  page_size: number;
  developers: string;
  metacritic: string;
  publishers: string;
  search_exact: boolean;
  exclude_stores: string;
  genres: string | number;
  search_precise: boolean;
  platforms_count: number;
  exclude_parents: boolean;
  exclude_collection: number;
  exclude_additions: boolean;
  exclude_game_series: boolean;
  parent_platforms: string | number;
  ordering: OrderingOptions | PrefixedOrderingOptions<OrderingOptions>;
};

export type RawgAllGamesResponse = {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      id: number;
      name: string;
      slug: string;
      added: number;
      rating: number;
      released: string;
      background_image: string;
      parent_platforms: {
        platform: IdNameSlug;
      }[];
      genres: [
        IdNameSlug & {
          games_count: number;
          image_background: string;
        },
      ];
      short_screenshots: {
        id: number;
        image: string;
      }[];
      platforms: {
        platform: IdNameSlug & {
          image?: string | null;
          year_end?: string | null;
          year_start?: number | null;
          games_count?: number | null;
          image_background?: string | null;
        };
        released_at?: string;
      }[];

      tba: boolean;
      user_game: null;
      updated: string;
      playtime: number;
      metacritic: number;
      rating_top: number;
      ratings_count: number;
      reviews_count: number;
      dominant_color: string;
      esrb_rating: IdNameSlug;
      saturated_color: string;
      suggestions_count: number;
      reviews_text_count: number;
      ratings: {
        id: number;
        title: string;
        count: number;
        percent: number;
      }[];
      added_by_status: AddedByStatus;
      stores: {
        id: number;
        store: IdNameSlug[] & {
          domain: string;
          games_count: number;
          image_background: string;
        };
      }[];
      tags: [
        IdNameSlug & {
          language: string;
          games_count: number;
          image_background: string;
        },
      ];
    },
  ];
};

export type RawgGameResponse = {
  id: number;
  name: string;
  slug: string;
  added: number;
  rating: number;
  website: string;
  updated: string;
  released: string;
  description: string;
  description_raw: string;
  background_image: string;
  parent_platforms: {
    platform: IdNameSlug;
  }[];
  platforms: {
    platform: IdNameSlug & {
      image?: null;
      year_end?: null;
      year_start?: number | null;
      games_count?: number;
      released_at: string;
      image_background?: string;
    };
  }[];
  publishers: [
    IdNameSlug & {
      games_count: number;
      image_background: string;
    },
  ];
  developers: [
    IdNameSlug & {
      games_count: number;
      image_background: string;
    },
  ];
  genres: [
    IdNameSlug & {
      games_count: number;
      image_background: string;
    },
  ];

  tba: boolean;
  playtime: number;
  rating_top: number;
  reddit_url: string;
  reddit_name: string;
  reddit_logo: string;
  movies_count: number;
  reddit_count: number;
  twitch_count: number;
  name_original: string;
  youtube_count: number;
  ratings_count: number;
  parents_count: number;
  reviews_count: number;
  creators_count: number;
  dominant_color: string;
  metacritic_url: string;
  saturated_color: string;
  additions_count: number;
  esrb_rating: IdNameSlug;
  screenshots_count: number;
  metacritic: number | null;
  suggestions_count: number;
  game_series_count: number;
  achievements_count: number;
  reddit_description: string;
  reviews_text_count: number;
  added_by_status: AddedByStatus;
  parent_achievements_count: number;
  background_image_additional: string;
  ratings: {
    id: number;
    title: string;
    count: number;
    percent: number;
  }[];
  reactions: {
    '1': number;
    '2': number;
    '3': number;
  };
  stores: {
    id: number;
    url: string;
    store: IdNameSlug & {
      domain: string;
      games_count: number;
      image_background: string;
    };
  }[];
  tags: [
    IdNameSlug & {
      language: string;
      games_count: number;
      image_background: string;
    },
  ];
};
