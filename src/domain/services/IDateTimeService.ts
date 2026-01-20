export interface IDateTimeService {
  now(): Date;
  isWeekend(date: Date): boolean;
  getPeriodOfDay(date: Date): 'morning' | 'evening' | 'night';
  toISOString(date: Date): string;
  format(date: Date, formatString: string): string;
  addDays(date: Date, days: number): Date;
  addHours(date: Date, hours: number): Date;
  differenceInDays(dateLeft: Date, dateRight: Date): number;
  differenceInHours(dateLeft: Date, dateRight: Date): number;
}
