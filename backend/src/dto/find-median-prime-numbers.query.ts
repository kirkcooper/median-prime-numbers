import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class UpperLimitQuery {
  @IsNumber()
  @Min(2)
  @Type(() => Number)
  n: number;
}
