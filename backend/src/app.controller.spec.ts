import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PrimesService } from './primes.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [PrimesService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('findMedianPrimeNumbers', () => {
    it('should return [3,5]', async () => {
      const medians = await appController.findMedianPrimeNumbers({ n: 10 });
      expect(medians.length).toBe(2);
      expect(medians[0]).toBe(3);
      expect(medians[1]).toBe(5);
    });

    it('should return [7]', async () => {
      const medians = await appController.findMedianPrimeNumbers({ n: 18 });
      expect(medians.length).toBe(1);
      expect(medians[0]).toBe(7);
    });

    it('should cache the prime numbers', async () => {
      let start = new Date().getTime();
      await appController.findMedianPrimeNumbers({ n: 1_000_000 });
      const elapsedFirst = new Date().getTime() - start;

      start = new Date().getTime();
      const medians = await appController.findMedianPrimeNumbers({
        n: 1_000_000,
      });
      const elapsedSecond = new Date().getTime() - start;

      // should be to at least twice faster
      expect(elapsedSecond < elapsedFirst / 2);

      expect(medians.length).toBe(2);
      expect(medians[0]).toBe(470299);
      expect(medians[1]).toBe(470303);
    });
  });
});
