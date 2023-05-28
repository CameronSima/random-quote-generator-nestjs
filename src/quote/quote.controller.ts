import { Controller, Get, Param } from '@nestjs/common';
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
  get(@Param('id') id: number): Quote | undefined {
    return this.quoteService.findOne(id);
  }

  @Get()
  getAll(): Quote[] {
    return this.quoteService.findAll();
  }
}
