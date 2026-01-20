import { Race } from '../entities/Race';

export interface IRaceRepository {
  create(race: Race): Promise<Race>;
  findById(id: string): Promise<Race | null>;
  findAll(): Promise<Race[]>;
  update(race: Race): Promise<Race>;
  delete(id: string): Promise<void>;
}
