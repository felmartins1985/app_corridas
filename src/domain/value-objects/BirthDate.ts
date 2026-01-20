export class BirthDate {
  constructor(public readonly value: Date) {
    if (!BirthDate.isValid(value)) {
      throw new Error('BirthDate invalid');
    }
  }

  static isValid(date: Date): boolean {
    if (!(date instanceof Date) || isNaN(date.getTime())) return false;
    const now = new Date();
    return date < now && date.getFullYear() > 1900;
  }
}
