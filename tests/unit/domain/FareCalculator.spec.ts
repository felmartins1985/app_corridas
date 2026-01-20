import { FareCalculator } from '../../../src/domain/services/FareCalculator';

describe('FareCalculator', () => {
  let fareCalculator: FareCalculator;

  beforeEach(() => {
    fareCalculator = new FareCalculator();
  });

  describe('calculate', () => {
    it('should calculate fare for weekday morning correctly', () => {
      const date = new Date('2024-01-15T08:00:00'); 
      const distanceMeters = 5000;

      const result = fareCalculator.calculate(distanceMeters, date);

      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe('number');
    });

    it('should calculate fare for weekend night correctly', () => {
      const date = new Date('2024-01-20T22:00:00');
      const distanceMeters = 10000;

      const result = fareCalculator.calculate(distanceMeters, date);

      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe('number');
    });

    it('should return higher fare for weekend than weekday', () => {
      const distanceMeters = 5000;
      const weekday = new Date('2024-01-15T12:00:00');
      const weekend = new Date('2024-01-20T12:00:00');

      const weekdayFare = fareCalculator.calculate(distanceMeters, weekday);
      const weekendFare = fareCalculator.calculate(distanceMeters, weekend);

      expect(weekendFare).toBeGreaterThan(weekdayFare);
    });
  });
});
