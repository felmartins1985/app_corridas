import { Driver } from '../../src/domain/entities/Driver';
import { Passenger } from '../../src/domain/entities/Passenger';
import { Race } from '../../src/domain/entities/Race';
import { Gender } from '../../src/domain/enums/Gender';
import { Cpf } from '../../src/domain/value-objects/Cpf';
import { BirthDate } from '../../src/domain/value-objects/BirthDate';
import { Address } from '../../src/domain/value-objects/Address';
import { GeoLocation } from '../../src/domain/value-objects/GeoLocation';

export const mockDriverData = {
  id: '0b3f9c2a-8e7a-4d1b-9f6e-2c5a8d3e7f1a',
  name: 'João Silva',
  cpf: '11144477735',
  birthDate: new Date('1990-01-01'),
  gender: Gender.MALE,
  address: {
    street: 'Rua Teste',
    number: '123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01000-000',
  },
};

export const mockPassengerData = {
  id: '1c4f9d3b-9e8b-5e2c-0f7e-3d6b9e4f8g2b',
  name: 'Maria Santos',
  cpf: '12345678909',
  birthDate: new Date('1995-05-15'),
  gender: Gender.FEMALE,
  address: {
    street: 'Avenida Principal',
    number: '456',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '02000-000',
  },
};

export const mockRaceData = {
  id: '9f5dad93-ec43-4598-bfe3-20df79d48ed8',
  driverId: mockDriverData.id,
  passengerId: mockPassengerData.id,
  origin: { latitude: -23.5505, longitude: -46.6333 },
  destination: { latitude: -23.5629, longitude: -46.6544 },
  price: 15.50,
  distanceMeters: 5000,
  date: new Date('2024-01-01T10:00:00'),
};

export const createMockDriver = (overrides?: Partial<typeof mockDriverData>): Driver => {
  const data = { ...mockDriverData, ...overrides };
  return new Driver(
    data.id,
    data.name,
    new Cpf(data.cpf),
    new BirthDate(data.birthDate),
    data.gender,
    new Address(
      data.address.street,
      data.address.number,
      data.address.city,
      data.address.state,
      data.address.zipCode
    )
  );
};

export const createMockPassenger = (overrides?: Partial<typeof mockPassengerData>): Passenger => {
  const data = { ...mockPassengerData, ...overrides };
  return new Passenger(
    data.id,
    data.name,
    new Cpf(data.cpf),
    new BirthDate(data.birthDate),
    data.gender,
    new Address(
      data.address.street,
      data.address.number,
      data.address.city,
      data.address.state,
      data.address.zipCode
    )
  );
};

export const createMockRace = (overrides?: Partial<typeof mockRaceData>): Race => {
  const data = { ...mockRaceData, ...overrides };
  return new Race(
    data.id,
    data.passengerId,
    data.driverId,
    new GeoLocation(data.origin.latitude, data.origin.longitude),
    new GeoLocation(data.destination.latitude, data.destination.longitude),
    data.date,
    data.distanceMeters,
    data.price
  );
};
