import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { cp } from 'fs';
import { PaginatedQuoteQuery, PaginatedQuoteResponse } from './dto';
import { Quote } from './models';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  getRandom(): Quote {
    return this.quoteService.findRandom();
  }

  @Get('all')
  @UsePipes(new ValidationPipe({ transform: true }))
  getAll(@Query() pagination: PaginatedQuoteQuery): PaginatedQuoteResponse {
    const { page, limit } = pagination;

    const quotes = this.quoteService.findAll(page, limit);
    const total = this.quoteService.getCount();
    const count = quotes.length;

    const meta = {
      page,
      limit,
      total,
      count,
    };

    return {
      data: quotes,
      meta,
    };
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number): Quote | undefined {
    const quote = this.quoteService.findOne(id);
    if (!quote) {
      throw new NotFoundException('Quote not found');
    }
    return quote;
  }
}
