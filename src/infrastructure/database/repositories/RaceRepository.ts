import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { RaceSchema } from '../schemas/RaceSchema';
import { IRaceRepository } from '../../../domain/repositories/IRaceRepository';
import { Race } from '../../../domain/entities/Race';
import { GeoLocation } from '../../../domain/value-objects/GeoLocation';

@injectable()
export class RaceRepository implements IRaceRepository {
  private ormRepo: Repository<RaceSchema>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(RaceSchema);
  }

  async create(race: Race): Promise<Race> {
    const entity = this.ormRepo.create({
      id: race.id,
      passengerId: race.passengerId,
      driverId: race.driverId,
      originLat: race.origin.latitude,
      originLng: race.origin.longitude,
      destinationLat: race.destination.latitude,
      destinationLng: race.destination.longitude,
      date: race.date,
      distanceMeters: race.distanceMeters,
      price: race.price,
    });
    await this.ormRepo.save(entity);
    return race;
  }

  async findById(id: string): Promise<Race | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async findAll(): Promise<Race[]> {
    const entities = await this.ormRepo.find();
    return entities.map(this.toDomain);
  }

  async update(race: Race): Promise<Race> {
    await this.ormRepo.update(race.id, {
      passengerId: race.passengerId,
      driverId: race.driverId,
      originLat: race.origin.latitude,
      originLng: race.origin.longitude,
      destinationLat: race.destination.latitude,
      destinationLng: race.destination.longitude,
      date: race.date,
      distanceMeters: race.distanceMeters,
      price: race.price,
    });
    return race;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  private toDomain(entity: RaceSchema): Race {
    return new Race(
      entity.id,
      entity.passengerId,
      entity.driverId,
      new GeoLocation(entity.originLat, entity.originLng),
      new GeoLocation(entity.destinationLat, entity.destinationLng),
      new Date(entity.date),
      entity.distanceMeters,
      entity.price,
    );
  }
}
