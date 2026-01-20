import { FareStrategy } from './FareStrategy';

export class WeekdayNightFareStrategy implements FareStrategy {
  isApplicable(date: Date): boolean {
    const day = date.getDay();
    const hour = date.getHours();
    return day > 0 && day < 6 && (hour >= 20 || hour < 8);
  }
  getFarePerKm(): number {
    return 3.1;
  }
}
