import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Quote } from './models';

export class PaginatedQuoteQuery {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  limit?: number;

  constructor(page?: number, limit?: number) {
    this.page = page || 1;
    this.limit = limit || 10;
  }
}

export class PaginatedQuoteResponse {
  data: Quote[];
  meta: {
    page: number;
    limit: number;
    total: number;
    count: number;
    nextPageUrl?: string;
    prevPageUrl?: string;
  };
}
