import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteService],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a random quote', () => {
    const quote = service.getRandom();
    expect(quote).toBeDefined();
  });

  it('should return a quote by id', () => {
    const quote = service.get(21);
    expect(quote).toBeDefined();
    expect(quote?.quote_id).toBe(21);
    expect(quote?.quote).toBe('God, yeah… Ah! This…');
  });

  it('should return all quotes', () => {
    const quotes = service.getAll();
    expect(quotes).toBeDefined();
    expect(quotes.length).toBeGreaterThan(0);
  });
});
