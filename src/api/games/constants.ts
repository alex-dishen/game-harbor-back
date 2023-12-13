export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

export enum GamesOrderBy {
  Name = 'name',
  Released = 'released',
  Popularity = 'popularity',
  Rating = 'rating',
}

export const OrderByOptions = {
  [GamesOrderBy.Name]: [{ name: SortOrder.asc }],
  [GamesOrderBy.Released]: [
    { released: SortOrder.desc },
    { id: SortOrder.asc },
  ],
  [GamesOrderBy.Popularity]: [{ added: SortOrder.desc }, { id: SortOrder.asc }],
  [GamesOrderBy.Rating]: [{ rating: SortOrder.desc }, { id: SortOrder.asc }],
};
