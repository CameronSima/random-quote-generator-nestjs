import { Test, TestingModule } from '@nestjs/testing';
import { Filter, Quote } from './models';
import { QuoteService } from './quote.service';
import { filterCharacter, filterText } from './utils';

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
    const quote = service.findRandom();
    expect(quote).toBeDefined();
    expect(quote?.quote_id).toBeDefined();
    expect(quote?.quote).toBeDefined();
    expect(quote?.character).toBeDefined();
  });

  it('should return a quote by id', () => {
    const quote = service.findOne(21);
    expect(quote).toBeDefined();
    expect(quote?.quote_id).toBe(21);
    expect(quote?.quote).toBe('God, yeah… Ah! This…');
  });

  it('should return all quotes', () => {
    const { quotes, total } = service.findAll(1, 10);
    expect(quotes).toBeDefined();
    expect(quotes.length).toBe(10);
  });

  it('should return all quotes (page 2)', () => {
    const { quotes, total } = service.findAll(2, 10);
    expect(quotes).toBeDefined();
    expect(quotes.length).toBe(10);
    expect(total).toBe(1749);
    expect(quotes[0].quote_id).toBe(10);
  });

  it('should filter quotes by character', () => {
    const filters: Filter<Quote>[] = [filterCharacter('dwight')];
    const { quotes, total } = service.findAll(1, 10, filters);
    expect(quotes).toBeDefined();
    expect(quotes.length).toBe(10);
    expect(quotes[0].character).toBe('Dwight');
    expect(total).toBe(419);
  });

  it('should filter quotes by text', () => {
    const filters: Filter<Quote>[] = [filterText('my cousin Mose')];
    const { quotes, total } = service.findAll(1, 10, filters);
    expect(quotes).toBeDefined();
    expect(quotes.length).toBe(2);
    expect(total).toBe(2);
    expect(quotes[0].quote).toBe(
      'My cousin Mose’s best friend was a dog. One day, he was foaming at the mouth, so I had to shoot him dead. Turns out, he had only eaten one of Mose’s cream pies. Did I feel bad for killing him? No. That’s how you deal with a thief.',
    );
  });

  it('should filter quotes by text and character', () => {
    const filters: Filter<Quote>[] = [
      filterText('I can do it'),
      filterCharacter('dwight'),
    ];
    const { quotes, total } = service.findAll(1, 10, filters);
    expect(quotes).toBeDefined();
    expect(quotes.length).toBe(1);
    expect(total).toBe(1);
    expect(quotes[0].quote).toBe('Yes. I can do it. I’m your man.');
  });
});
