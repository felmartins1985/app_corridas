export interface FareStrategy {
  isApplicable(date: Date): boolean;
  getFarePerKm(): number;
}
