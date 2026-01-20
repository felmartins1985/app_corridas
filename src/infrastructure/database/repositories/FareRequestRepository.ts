import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { FareRequestSchema } from '../schemas/FareRequestSchema';
import { IFareRequestRepository } from '../../../domain/repositories/IFareRequestRepository';
import { FareRequest } from '../../../domain/entities/FareRequest';
import { GeoLocation } from '../../../domain/value-objects/GeoLocation';

@injectable()
export class FareRequestRepository implements IFareRequestRepository {
  private ormRepo: Repository<FareRequestSchema>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(FareRequestSchema);
  }

  async create(fareRequest: FareRequest): Promise<FareRequest> {
    const entity = this.ormRepo.create({
      id: fareRequest.id,
      passengerId: fareRequest.passengerId,
      originLat: fareRequest.origin.latitude,
      originLng: fareRequest.origin.longitude,
      destinationLat: fareRequest.destination.latitude,
      destinationLng: fareRequest.destination.longitude,
      date: fareRequest.date,
    });
    await this.ormRepo.save(entity);
    return fareRequest;
  }

  async findById(id: string): Promise<FareRequest | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async findAll(): Promise<FareRequest[]> {
    const entities = await this.ormRepo.find();
    return entities.map(this.toDomain);
  }

  async update(fareRequest: FareRequest): Promise<FareRequest> {
    await this.ormRepo.update(fareRequest.id, {
      passengerId: fareRequest.passengerId,
      originLat: fareRequest.origin.latitude,
      originLng: fareRequest.origin.longitude,
      destinationLat: fareRequest.destination.latitude,
      destinationLng: fareRequest.destination.longitude,
      date: fareRequest.date,
    });
    return fareRequest;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  private toDomain(entity: FareRequestSchema): FareRequest {
    return new FareRequest(
      entity.id,
      entity.passengerId,
      new GeoLocation(entity.originLat, entity.originLng),
      new GeoLocation(entity.destinationLat, entity.destinationLng),
      new Date(entity.date),
    );
  }
}
