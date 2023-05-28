import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { QuotesModule } from './../src/quote/quote.module';

describe('QuoteController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [QuotesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/quote (GET)', () => {
    return request(app.getHttpServer())
      .get('/quote')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.quote_id).toBeDefined();
        expect(res.body.quote).toBeDefined();
        expect(res.body.character).toBeDefined();
      });
  });

  it('/quote/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/quote/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.quote_id).toBeDefined();
        expect(res.body.quote).toBeDefined();
        expect(res.body.character).toBeDefined();
      });
  });

  it('/quote/:id (GET) - invalid id (not found)', () => {
    return request(app.getHttpServer())
      .get('/quote/9999999')
      .expect(404)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.error).toBeDefined();
      });
  });

  it('/quote/:id (GET) - invalid id (string)', () => {
    return request(app.getHttpServer())
      .get('/quote/not-a-number')
      .expect(400)
      .expect((res) => {
        console.log(res.body);
        expect(res.body).toBeDefined();
        expect(res.body.message).toBe(
          'Validation failed (numeric string is expected)',
        );
        expect(res.body.error).toBe('Bad Request');
      });
  });
});
