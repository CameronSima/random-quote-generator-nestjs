import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteService } from './quote/quote.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, QuoteService],
})
export class AppModule {}
