import { Cpf } from '../../../src/domain/value-objects/Cpf';

describe('Cpf', () => {
  describe('isValid', () => {
    it('should validate correct CPF', () => {
      expect(Cpf.isValid('11144477735')).toBe(true);
    });

    it('should reject invalid CPF', () => {
      expect(Cpf.isValid('12345678901')).toBe(false);
      expect(Cpf.isValid('00000000000')).toBe(false);
      expect(Cpf.isValid('11111111111')).toBe(false);
    });

    it('should reject CPF with invalid format', () => {
      expect(Cpf.isValid('123')).toBe(false);
      expect(Cpf.isValid('abc')).toBe(false);
      expect(Cpf.isValid('')).toBe(false);
    });
  });

  describe('constructor', () => {
    it('should create CPF with valid value', () => {
      const cpf = new Cpf('11144477735');
      expect(cpf.getValue()).toBe('111.444.777-35');
    });

    it('should throw error for invalid CPF', () => {
      expect(() => new Cpf('12345678901')).toThrow('CPF invalid');
    });
  });

  describe('format', () => {
    it('should format CPF correctly', () => {
      const cpf = new Cpf('11144477735');
      expect(cpf.getValue()).toBe('111.444.777-35');
    });
  });
});
