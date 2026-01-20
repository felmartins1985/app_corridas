import { WeekdayMorningFareStrategy } from '@domain/services/WeekdayMorningFareStrategy';
import { WeekdayEveningFareStrategy } from '@domain/services/WeekdayEveningFareStrategy';
import { WeekdayNightFareStrategy } from '@domain/services/WeekdayNightFareStrategy';
import { WeekendMorningFareStrategy } from '@domain/services/WeekendMorningFareStrategy';
import { WeekendEveningFareStrategy } from '@domain/services/WeekendEveningFareStrategy';
import { WeekendNightFareStrategy } from '@domain/services/WeekendNightFareStrategy';

describe('Fare Strategies', () => {
  describe('WeekdayMorningFareStrategy', () => {
    it('should return correct fare per km', () => {
      const strategy = new WeekdayMorningFareStrategy();
      
      expect(strategy.getFarePerKm()).toBe(2.8);
    });

    it('should be applicable for weekday morning hours', () => {
      const strategy = new WeekdayMorningFareStrategy();
      const weekdayMorning = new Date('2024-01-15T10:00:00');
      const weekdayNight = new Date('2024-01-15T22:00:00'); 
      const weekend = new Date('2024-01-13T10:00:00');
      
      expect(strategy.isApplicable(weekdayMorning)).toBe(true);
      expect(strategy.isApplicable(weekdayNight)).toBe(false);
      expect(strategy.isApplicable(weekend)).toBe(false);
    });
  });

  describe('WeekdayEveningFareStrategy', () => {
    it('should return correct fare per km', () => {
      const strategy = new WeekdayEveningFareStrategy();
      
      expect(strategy.getFarePerKm()).toBe(3.5);
    });

    it('should be applicable for weekday evening hours', () => {
      const strategy = new WeekdayEveningFareStrategy();
      const weekdayEvening = new Date('2024-01-15T18:00:00');
      
      expect(strategy.isApplicable(weekdayEvening)).toBe(true);
    });
  });

  describe('WeekdayNightFareStrategy', () => {
    it('should return correct fare per km', () => {
      const strategy = new WeekdayNightFareStrategy();
      
      expect(strategy.getFarePerKm()).toBe(3.1);
    });

    it('should be applicable for weekday night hours', () => {
      const strategy = new WeekdayNightFareStrategy();
      const weekdayNight = new Date('2024-01-15T23:00:00');
      
      expect(strategy.isApplicable(weekdayNight)).toBe(true);
    });
  });

  describe('WeekendMorningFareStrategy', () => {
    it('should return correct fare per km', () => {
      const strategy = new WeekendMorningFareStrategy();
      
      expect(strategy.getFarePerKm()).toBe(3.0);
    });

    it('should be applicable for weekend morning hours', () => {
      const strategy = new WeekendMorningFareStrategy();
      const saturdayMorning = new Date('2024-01-13T10:00:00');
      const sundayMorning = new Date('2024-01-14T10:00:00');
      
      expect(strategy.isApplicable(saturdayMorning)).toBe(true);
      expect(strategy.isApplicable(sundayMorning)).toBe(true);
    });
  });

  describe('WeekendEveningFareStrategy', () => {
    it('should return correct fare per km', () => {
      const strategy = new WeekendEveningFareStrategy();
      
      expect(strategy.getFarePerKm()).toBe(4.1);
    });

    it('should be applicable for weekend evening hours', () => {
      const strategy = new WeekendEveningFareStrategy();
      const saturdayEvening = new Date('2024-01-13T18:00:00');
      
      expect(strategy.isApplicable(saturdayEvening)).toBe(true);
    });
  });

  describe('WeekendNightFareStrategy', () => {
    it('should return correct fare per km', () => {
      const strategy = new WeekendNightFareStrategy();
      
      expect(strategy.getFarePerKm()).toBe(3.5);
    });

    it('should be applicable for weekend night hours', () => {
      const strategy = new WeekendNightFareStrategy();
      const saturdayNight = new Date('2024-01-13T23:00:00'); 
      const sundayNight = new Date('2024-01-14T02:00:00'); 
      
      expect(strategy.isApplicable(saturdayNight)).toBe(true);
      expect(strategy.isApplicable(sundayNight)).toBe(true);
    });
  });
});
