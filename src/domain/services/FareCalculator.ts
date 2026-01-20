import { FareStrategy } from './FareStrategy';
import { WeekdayMorningFareStrategy } from './WeekdayMorningFareStrategy';
import { WeekdayEveningFareStrategy } from './WeekdayEveningFareStrategy';
import { WeekdayNightFareStrategy } from './WeekdayNightFareStrategy';
import { WeekendMorningFareStrategy } from './WeekendMorningFareStrategy';
import { WeekendEveningFareStrategy } from './WeekendEveningFareStrategy';
import { WeekendNightFareStrategy } from './WeekendNightFareStrategy';

export class FareCalculator {
  private strategies: FareStrategy[] = [
    new WeekdayMorningFareStrategy(),
    new WeekdayEveningFareStrategy(),
    new WeekdayNightFareStrategy(),
    new WeekendMorningFareStrategy(),
    new WeekendEveningFareStrategy(),
    new WeekendNightFareStrategy(),
  ];

  calculate(distanceMeters: number, date: Date): number {
    const strategy = this.strategies.find((s) => s.isApplicable(date));
    if (!strategy) throw new Error('No fare strategy applicable for the given date');
    const fare = (distanceMeters / 1000) * strategy.getFarePerKm();
    return Math.round(fare * 100) / 100;
  }
}
