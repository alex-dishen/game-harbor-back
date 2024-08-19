import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import IsNullOrNumberDecorator from '../decorators/is-number-or-null.decorator';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ name: 'skip', required: false, type: Number })
  @IsOptional()
  @Type(() => Number)
  skip?: number;

  @ApiProperty({ name: 'take', required: false, type: Number })
  @IsOptional()
  @Type(() => Number)
  take?: number;
}

export class PaginationMetadata {
  @ApiProperty({ example: '11', description: 'Total number of items' })
  @IsInt()
  total: number;

  @ApiProperty({
    example: '2',
    description: 'Last page encountering per page and total value',
  })
  @IsInt()
  lastPage: number;

  @ApiProperty({ example: '1', description: 'Current page user is at' })
  @IsInt()
  currentPage: number;

  @ApiProperty({ example: '10', description: 'Items returned per request' })
  @IsInt()
  perPage: number;

  @ApiProperty({ example: 'null', description: 'Previous number of items' })
  @IsNullOrNumberDecorator({ message: 'Must be integer or null' })
  prev: number | null;

  @ApiProperty({ example: '2', description: 'Next number of items' })
  @IsNullOrNumberDecorator({ message: 'Must be integer or null' })
  next: number | null;
}

export class PaginatedResult<T> {
  data: T[];
  meta: PaginationMetadata;
}

export type PaginateOptions = { skip?: number; take?: number };
