import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { cp } from 'fs';
import { Quote } from './models';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
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

  @Get('all')
  getAll(): Quote[] {
    return this.quoteService.findAll();
  }
}
