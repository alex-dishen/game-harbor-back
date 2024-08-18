import { FilterQuery, Model, ProjectionType } from 'mongoose';
import { PaginatedResult, PaginateOptions } from '../dto/pagination.dto';

type PaginateArgs<T> = {
  model: Model<T>;
  filter?: FilterQuery<T>;
  options?: PaginateOptions;
  projection?: ProjectionType<T>;
};

export const paginate = async <T, U>({
  model,
  filter,
  options,
  projection,
}: PaginateArgs<T>): Promise<PaginatedResult<U>> => {
  const skip = options?.skip || 0;
  const take = options?.take || 10;

  const total = await model.countDocuments(filter).exec();
  const data = (await model
    .find(filter, projection)
    .skip(skip)
    .limit(take)
    .exec()) as U[];

  const lastPage = Math.ceil(total / take);
  const currentPage = skip === 0 ? 1 : Math.round(skip / take) + 1;
  const prev = currentPage < lastPage ? currentPage * take - take : null;
  const next = currentPage < lastPage ? currentPage * take : null;

  return {
    data,
    meta: {
      prev,
      next,
      total,
      lastPage,
      currentPage,
      perPage: take,
    },
  };
};
