import { Test, TestingModule } from '@nestjs/testing';
import { MockQuoteService } from '../mocks';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';

describe('QuoteController', () => {
  let controller: QuoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        {
          provide: QuoteService,
          useClass: MockQuoteService,
        },
      ],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a random quote', () => {
    const quote = controller.getRandom();
    expect(quote).toBeDefined();
  });

  it('should return a quote by id', () => {
    const quote = controller.get(3);
    expect(quote).toBeDefined();
    expect(quote?.quote_id).toBe(3);
    expect(quote?.quote).toBe('Donuts');
  });

  it('should return all quotes', () => {
    const res = controller.getAll({ page: 1, limit: 10 });
    console.log(res);
    expect(res).toBeDefined();
    expect(res.data.length).toBe(3);
    expect(res.meta.page).toBe(1);
    expect(res.meta.limit).toBe(10);
    expect(res.meta.total).toBe(3);
  });
});
