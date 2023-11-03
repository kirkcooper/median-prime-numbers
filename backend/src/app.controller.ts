import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UpperLimitQuery } from './dto/find-median-prime-numbers.query';
import { PrimesService } from './primes.service';
import { MediansTuple, getMediansOfSortedArray } from './utils';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly primesService: PrimesService) {}

  @Get('/median-prime-numbers')
  async findMedianPrimeNumbers(
    @Query() { n }: UpperLimitQuery,
  ): Promise<MediansTuple> {
    const primes = this.primesService.getPrimes(n);
    this.logger.debug(`primes: ${primes}`);

    const medianPrimes = getMediansOfSortedArray(primes);
    return medianPrimes;
  }
}
