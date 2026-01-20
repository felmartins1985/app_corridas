import { Driver } from '../entities/Driver';

export interface IDriverRepository {
  create(driver: Driver): Promise<Driver>;
  findById(id: string): Promise<Driver | null>;
  findByCpf(cpf: string): Promise<Driver | null>;
  findAll(): Promise<Driver[]>;
  update(driver: Driver): Promise<Driver>;
  delete(id: string): Promise<void>;
}
