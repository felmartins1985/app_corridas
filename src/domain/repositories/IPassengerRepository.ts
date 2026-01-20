import { Passenger } from '../entities/Passenger';

export interface IPassengerRepository {
  create(passenger: Passenger): Promise<Passenger>;
  findById(id: string): Promise<Passenger | null>;
  findByCpf(cpf: string): Promise<Passenger | null>;
  findAll(): Promise<Passenger[]>;
  update(passenger: Passenger): Promise<Passenger>;
  delete(id: string): Promise<void>;
}
