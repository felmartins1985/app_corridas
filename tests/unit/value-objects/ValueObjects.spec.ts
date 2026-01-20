import { GeoLocation } from '../../../src/domain/value-objects/GeoLocation';
import { BirthDate } from '../../../src/domain/value-objects/BirthDate';
import { Address } from '../../../src/domain/value-objects/Address';

describe('Value Objects', () => {
  describe('GeoLocation', () => {
    it('should create a valid geolocation', () => {
      const location = new GeoLocation(-23.5505, -46.6333);
      
      expect(location.latitude).toBe(-23.5505);
      expect(location.longitude).toBe(-46.6333);
    });

    it('should throw error for invalid latitude', () => {
      expect(() => new GeoLocation(100, -46.6333)).toThrow();
    });

    it('should throw error for invalid longitude', () => {
      expect(() => new GeoLocation(-23.5505, 200)).toThrow();
    });
  });

  describe('BirthDate', () => {
    it('should create a valid birthdate', () => {
      const birthDate = new BirthDate(new Date('1990-01-01'));
      
      expect(birthDate.value).toBeInstanceOf(Date);
    });

    it('should throw error for future date', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      
      expect(() => new BirthDate(futureDate)).toThrow();
    });
  });

  describe('Address', () => {
    it('should create a valid address', () => {
      const address = new Address('Rua Teste', '123', 'São Paulo', 'SP', '01000-000');
      
      expect(address.street).toBe('Rua Teste');
      expect(address.number).toBe('123');
      expect(address.city).toBe('São Paulo');
      expect(address.state).toBe('SP');
      expect(address.zipCode).toBe('01000-000');
    });
  });
});
