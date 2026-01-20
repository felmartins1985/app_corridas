import { CreateDriverDTO, UpdateDriverDTO } from '@presentation/dtos/DriverDTO';
import { CreatePassengerDTO, UpdatePassengerDTO } from '@presentation/dtos/PassengerDTO';
import { CalculateFareDTO } from '@presentation/dtos/FareDTO';
import { AcceptRaceDTO } from '@presentation/dtos/RaceDTO';

export const mockCreateDriverDTO: CreateDriverDTO = {
  name: 'João Silva',
  cpf: '11144477735',
  birthDate: '1990-01-01',
  gender: 'MALE',
  address: {
    street: 'Rua Teste',
    number: '123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01000-000',
  },
};

export const mockUpdateDriverDTO: UpdateDriverDTO = {
  name: 'João Silva Atualizado',
  address: {
    street: 'Rua Nova',
    number: '456',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '02000-000',
  },
};

export const mockCreatePassengerDTO: CreatePassengerDTO = {
  name: 'Maria Santos',
  cpf: '12345678909',
  birthDate: '1995-05-15',
  gender: 'FEMALE',
  address: {
    street: 'Avenida Principal',
    number: '456',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '02000-000',
  },
};

export const mockUpdatePassengerDTO: UpdatePassengerDTO = {
  name: 'Maria Santos Atualizada',
  address: {
    street: 'Rua Nova',
    number: '789',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '03000-000',
  },
};

export const mockCalculateFareDTO: CalculateFareDTO = {
  passengerId: '1c4f9d3b-9e8b-5e2c-0f7e-3d6b9e4f8g2b',
  originLat: -23.5505,
  originLng: -46.6333,
  destinationLat: -23.5629,
  destinationLng: -46.6544,
  date: '2024-01-15T10:30:00',
};

export const mockAcceptRaceDTO: AcceptRaceDTO = {
  driverId: '0b3f9c2a-8e7a-4d1b-9f6e-2c5a8d3e7f1a',
  passengerId: '1c4f9d3b-9e8b-5e2c-0f7e-3d6b9e4f8g2b',
  originLat: -23.5505,
  originLng: -46.6333,
  destinationLat: -23.5629,
  destinationLng: -46.6544,
  startDate: '2024-01-01T10:00:00',
};
