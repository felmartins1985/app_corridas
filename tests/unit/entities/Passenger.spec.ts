import { Passenger } from '@domain/entities/Passenger';
import { Cpf } from '@domain/value-objects/Cpf';
import { BirthDate } from '@domain/value-objects/BirthDate';
import { Address } from '@domain/value-objects/Address';
import { Gender } from '@domain/enums/Gender';

describe('Passenger Entity', () => {
  it('should create a passenger with all properties', () => {
    const id = 'passenger-123';
    const name = 'Maria Santos';
    const cpf = new Cpf('12345678909');
    const birthDate = new BirthDate(new Date('1995-05-15'));
    const gender = Gender.FEMALE;
    const address = new Address('Avenida Principal', '456', 'São Paulo', 'SP', '02000-000');

    const passenger = new Passenger(id, name, cpf, birthDate, gender, address);

    expect(passenger.id).toBe(id);
    expect(passenger.name).toBe(name);
    expect(passenger.cpf).toBe(cpf);
    expect(passenger.birthDate).toBe(birthDate);
    expect(passenger.gender).toBe(gender);
    expect(passenger.address).toBe(address);
  });

  it('should work with different genders', () => {
    const cpf = new Cpf('12345678909');
    const birthDate = new BirthDate(new Date('1990-01-01'));
    const address = new Address('Rua Test', '123', 'City', 'ST', '00000-000');

    const malePassenger = new Passenger('1', 'João', cpf, birthDate, Gender.MALE, address);
    const femalePassenger = new Passenger('2', 'Maria', cpf, birthDate, Gender.FEMALE, address);
    const otherPassenger = new Passenger('3', 'Alex', cpf, birthDate, Gender.OTHER, address);

    expect(malePassenger.gender).toBe(Gender.MALE);
    expect(femalePassenger.gender).toBe(Gender.FEMALE);
    expect(otherPassenger.gender).toBe(Gender.OTHER);
  });
});
