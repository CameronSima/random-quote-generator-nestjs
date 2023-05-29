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
import { PaginatedQuoteQuery, PaginatedQuoteResponse } from './dto';
import { Filter, Quote } from './models';
import { QuoteService } from './quote.service';
import { filterCharacter, filterText } from './utils';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getAll(@Query() query: PaginatedQuoteQuery): PaginatedQuoteResponse {
    const { page, limit, character, text } = query;

    const filters: Filter<Quote>[] = [];

    if (character) {
      filters.push(filterCharacter(character));
    }

    if (text) {
      filters.push(filterText(text));
    }

    const { quotes, total } = this.quoteService.findAll(page, limit, filters);
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

  @Get('random')
  getRandom(): Quote {
    return this.quoteService.findRandom();
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
