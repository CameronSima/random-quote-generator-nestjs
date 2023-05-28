import { Injectable } from '@nestjs/common';
import { Quote } from './models';
import officeQuotes from '../data/office_quotes.json';

@Injectable()
export class QuoteService {
  private data: Quote[] = officeQuotes;
  private count = 0;

  constructor() {
    this.count = this.data.length;
  }

  findRandom(): Quote {
    return this.data[Math.floor(Math.random() * this.data.length)];
  }

  findOne(id: number): Quote | undefined {
    return this.data.find((quote) => quote.quote_id === id);
  }

  findAll(page: number, limit: number): Quote[] {
    const startIndex = (page - 1) * limit;
    const quotes = this.data.slice(startIndex, startIndex + limit);
    return quotes;
  }

  getCount(): number {
    return this.count;
  }
}
