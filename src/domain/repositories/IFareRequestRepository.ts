import { FareRequest } from '../entities/FareRequest';

export interface IFareRequestRepository {
  create(fareRequest: FareRequest): Promise<FareRequest>;
  findById(id: string): Promise<FareRequest | null>;
  findAll(): Promise<FareRequest[]>;
  update(fareRequest: FareRequest): Promise<FareRequest>;
  delete(id: string): Promise<void>;
}
