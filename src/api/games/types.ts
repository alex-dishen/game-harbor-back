import { IdNameSlug } from 'src/shared/types';

export type Game = {
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
