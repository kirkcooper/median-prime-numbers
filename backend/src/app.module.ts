import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrimesService } from './primes.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrimesService],
})
export class AppModule {}
