import { Injectable } from '@nestjs/common';
import { Filter, Quote } from './models';
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

  findAll(
    page: number,
    limit: number,
    filters: Filter<Quote>[] = [],
  ): { quotes: Quote[]; total: number } {
    const startIndex = (page - 1) * limit;

    // apply filters
    const filteredData = filters.reduce(
      (result, filter) => filter(result),
      this.data,
    );

    // total is the length of the filtered data before pagination
    const total = filteredData.length;

    // apply pagination
    const quotes = filteredData.slice(startIndex, startIndex + limit);

    return { quotes, total };
  }

  getCount(): number {
    return this.count;
  }
}
