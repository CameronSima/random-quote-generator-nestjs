export class MockQuoteService {
  private readonly quotes = [
    {
      quote_id: 1,
      quote: 'Eat my shorts',
      character: 'Bart Simpson',
    },
    {
      quote_id: 2,
      quote: "D'oh",
      character: 'Homer Simpson',
    },
    {
      quote_id: 3,
      quote: 'Donuts',
      character: 'Homer Simpson',
    },
    {
      quote_id: 4,
      quote: 'Excellent',
      character: 'Mr. Burns',
    },
  ];

  findAll(): any[] {
    return this.quotes;
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
