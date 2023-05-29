export class MockQuoteService {
  private readonly quotes = [
    {
      quote_id: 1,
      quote: 'Eat my shorts',
      character: 'Bart',
    },
    {
      quote_id: 2,
      quote: "D'oh",
      character: 'Homer',
    },
    {
      quote_id: 3,
      quote: 'Donuts',
      character: 'Homer',
    },
    {
      quote_id: 4,
      quote: 'Excellent',
      character: 'Mr. Burns',
    },
  ];

  findAll(): { quotes: any[]; total: number } {
    return { quotes: this.quotes, total: this.quotes.length };
  }

  findOne(id: number): any {
    return this.quotes.find((quote) => quote.quote_id === id);
  }

  findRandom(): any {
    return this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }

  getCount(): number {
    return this.quotes.length;
  }
}
