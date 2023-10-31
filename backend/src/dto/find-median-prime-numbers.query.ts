import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class UpperLimitQuery {
  @IsNumber()
  @Min(2)
  @Max(1_000_000)
  @Type(() => Number)
  n: number;
}
