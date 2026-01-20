import { IDriverRepository } from '@domain/repositories/IDriverRepository';
import { IPassengerRepository } from '@domain/repositories/IPassengerRepository';
import { IRaceRepository } from '@domain/repositories/IRaceRepository';
import { IFareRequestRepository } from '@domain/repositories/IFareRequestRepository';

export const mockDriverRepository: jest.Mocked<IDriverRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findByCpf: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const mockPassengerRepository: jest.Mocked<IPassengerRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findByCpf: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const mockRaceRepository: jest.Mocked<IRaceRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const mockFareRequestRepository: jest.Mocked<IFareRequestRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
