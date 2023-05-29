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

  it('/quote/random (GET)', () => {
    return request(app.getHttpServer())
      .get('/quote/random')
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
        expect(res.body).toBeDefined();
        expect(res.body.message).toBe(
          'Validation failed (numeric string is expected)',
        );
        expect(res.body.error).toBe('Bad Request');
      });
  });

  it('/quote (GET) 200', () => {
    return request(app.getHttpServer())
      .get('/quote')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.data.length).toBe(10);
      });
  });

  it('/quote (GET) (200 pagination query params)', () => {
    return request(app.getHttpServer())
      .get('/quote?page=2&limit=25')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.data[0].quote_id).toBe(25);
        expect(res.body.data.length).toBe(25);
        expect(res.body.meta.page).toBe(2);
        expect(res.body.meta.limit).toBe(25);
        expect(res.body.meta.count).toBe(25);
      });
  });

  it('/quote (GET) pagination (400 bad query params)', () => {
    return request(app.getHttpServer())
      .get('/quote?page=foo&limit=bar')
      .expect(400)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(
          res.body.message.includes(
            'limit must be a number conforming to the specified constraints',
          ),
        ).toBeTruthy();
        expect(
          res.body.message.includes(
            'page must be a number conforming to the specified constraints',
          ),
        ).toBeTruthy();
      });
  });

  it('/quote (GET) pagination (400 excessive page size)', () => {
    return request(app.getHttpServer())
      .get('/quote?limit=999')
      .expect(400)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.error).toBe('Bad Request');
        expect(
          res.body.message.includes('limit must not be greater than 100'),
        ).toBeTruthy();
      });
  });

  it('/quote (GET) pagination (200 end of pages)', () => {
    return request(app.getHttpServer())
      .get('/quote?page=999')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.data.length).toBe(0);
        expect(res.body.meta.page).toBe(999);
        expect(res.body.meta.limit).toBe(10);
        expect(res.body.meta.count).toBe(0);
      });
  });
});
