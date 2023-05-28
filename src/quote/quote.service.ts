import { Injectable } from '@nestjs/common';
import { Quote } from './models';
import officeQuotes from '../data/office_quotes.json';

@Injectable()
export class QuoteService {
  private data: Quote[] = officeQuotes;

  constructor() {}

  getRandom(): Quote {
    return this.data[Math.floor(Math.random() * this.data.length)];
  }

  get(id: number): Quote | undefined {
    return this.data.find((quote) => quote.quote_id === id);
  }

  getAll(): Quote[] {
    return this.data;
  }
}
