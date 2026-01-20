import { FareStrategy } from './FareStrategy';

export class WeekdayEveningFareStrategy implements FareStrategy {
  isApplicable(date: Date): boolean {
    const day = date.getDay();
    const hour = date.getHours();
    return day > 0 && day < 6 && hour >= 17 && hour < 20;
  }
  getFarePerKm(): number {
    return 3.5;
  }
}
