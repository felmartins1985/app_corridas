import { Driver } from '../../../src/domain/entities/Driver';
import { Race } from '../../../src/domain/entities/Race';
import { createMockDriver, createMockRace } from '../../__mocks__/entities.mock';

describe('Entities', () => {
  describe('Driver', () => {
    it('should create a driver successfully', () => {
      const driver = createMockDriver();
      
      expect(driver).toBeInstanceOf(Driver);
      expect(driver.id).toBeDefined();
      expect(driver.name).toBeDefined();
    });

    it('should throw error if name is empty', () => {
      expect(() => createMockDriver({ name: '' })).toThrow('Name is required');
    });
  });

  describe('Race', () => {
    it('should create a race successfully', () => {
      const race = createMockRace();
      
      expect(race).toBeInstanceOf(Race);
      expect(race.id).toBeDefined();
      expect(race.price).toBeGreaterThan(0);
    });
  });
});
