import { Injectable } from '@nestjs/common';

const FIRST_PRIME = 2;
const INIT_UPPER_LIMIT = 100_000;

@Injectable()
export class PrimesService {
  cachedPrimes: boolean[];

  constructor() {
    // Precalculate and store the primes in memory
    this.cachedPrimes = this.sieveOfEratosthenes(INIT_UPPER_LIMIT);
  }

  /**
   *
   * @param n Upper limit for the prime numbers
   * @returns An array where each item is a boolean indicating wheter the index is a prime number
   */
  private sieveOfEratosthenes(n: number): boolean[] {
    // Create array [0..n] and fill all items with `true`
    const primes = Array.from({ length: n + 1 }, () => true);

    for (let i = FIRST_PRIME; i * i <= n; i++) {
      if (primes[i]) {
        // mark all multiples of `i` as not primes
        for (let j = i * i; j <= n; j += i) {
          primes[j] = false;
        }
      }
    }

    return primes;
  }

  /**
   *
   * @param primes An array where each item is a boolean indicating wheter the index is a prime number
   * @param limit The max prime number to return
   * @returns The primes as an array of numbers up to the passed limit
   */
  private convertToArrayOfNumbers(primes: boolean[], limit?: number): number[] {
    // Default to the length of the stored primes
    limit = limit ?? primes.length;

    const primeNumebrs: number[] = [];
    for (let i = FIRST_PRIME; i <= limit; i++) {
      if (primes[i]) {
        primeNumebrs.push(i);
      }
    }

    return primeNumebrs;
  }

  /**
   * Get prime numbers.
   *
   * @param upperLimit The upper limit of the prime numbers
   * @param useCache Use cached primes numbers (defaults to true)
   * @returns An array of prime numbers from 2 to the upperLimit
   */
  getPrimes(upperLimit: number, useCache: boolean = true): number[] {
    console.time('getPrimes');

    let primes: boolean[];

    if (!useCache) {
      primes = this.sieveOfEratosthenes(upperLimit);
    } else {
      if (upperLimit > this.cachedPrimes.length - 1) {
        // Find more primes
        this.cachedPrimes = this.sieveOfEratosthenes(upperLimit);
      }
      primes = this.cachedPrimes;
    }

    const primeNumbers = this.convertToArrayOfNumbers(primes, upperLimit);
    console.timeEnd('getPrimes');
    return primeNumbers;
  }

  getPrimesUcached(upperLimit: number): number[] {
    const primes = this.sieveOfEratosthenes(upperLimit);
    return this.convertToArrayOfNumbers(primes);
  }
}
