import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, Max, IsString } from 'class-validator';
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

  @IsOptional()
  @Type(() => String)
  @IsString()
  character?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  text?: string;

  constructor(
    page?: number,
    limit?: number,
    character?: string,
    text?: string,
  ) {
    this.page = page || 1;
    this.limit = limit || 10;
    this.character = character;
    this.text = text;
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
