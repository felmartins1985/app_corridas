import { injectable } from 'inversify';
import {
  format as dateFnsFormat,
  addDays as dateFnsAddDays,
  addHours as dateFnsAddHours,
  differenceInDays as dateFnsDifferenceInDays,
  differenceInHours as dateFnsDifferenceInHours,
  isWeekend as dateFnsIsWeekend,
  getHours,
} from 'date-fns';
import { IDateTimeService } from '@domain/services/IDateTimeService';
@injectable()
export class DateTimeService implements IDateTimeService {
  now(): Date {
    return new Date();
  }
  isWeekend(date: Date): boolean {
    return dateFnsIsWeekend(date);
  }
  getPeriodOfDay(date: Date): 'morning' | 'evening' | 'night' {
    const hour = getHours(date);
    if (hour >= 6 && hour < 12) {
      return 'morning';
    }
    if (hour >= 12 && hour < 18) {
      return 'evening';
    }
    return 'night';
  }
  toISOString(date: Date): string {
    return date.toISOString();
  }
  format(date: Date, formatString: string): string {
    return dateFnsFormat(date, formatString);
  }
  addDays(date: Date, days: number): Date {
    return dateFnsAddDays(date, days);
  }
  addHours(date: Date, hours: number): Date {
    return dateFnsAddHours(date, hours);
  }
  differenceInDays(dateLeft: Date, dateRight: Date): number {
    return dateFnsDifferenceInDays(dateLeft, dateRight);
  }
  differenceInHours(dateLeft: Date, dateRight: Date): number {
    return dateFnsDifferenceInHours(dateLeft, dateRight);
  }
}
