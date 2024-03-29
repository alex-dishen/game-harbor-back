import { RawgQueryParameters } from 'src/api/integration/types';

export type GetRawgDataArgs = {
  endpoint: string;
  nextURL?: string;
  params?: Partial<RawgQueryParameters>;
};

export type FetchAndInsertArgs = {
  numberOfPages: number;
  params?: Partial<RawgQueryParameters>;
};
