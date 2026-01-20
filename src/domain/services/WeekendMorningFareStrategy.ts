import { FareStrategy } from './FareStrategy';

export class WeekendMorningFareStrategy implements FareStrategy {
  isApplicable(date: Date): boolean {
    const day = date.getDay();
    const hour = date.getHours();
    return (day === 0 || day === 6) && hour >= 8 && hour < 17;
  }
  getFarePerKm(): number {
    return 3.0;
  }
}
