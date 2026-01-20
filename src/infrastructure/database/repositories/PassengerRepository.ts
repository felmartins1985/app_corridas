import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { PassengerSchema } from '../schemas/PassengerSchema';
import { IPassengerRepository } from '../../../domain/repositories/IPassengerRepository';
import { Passenger } from '../../../domain/entities/Passenger';
import { Cpf } from '../../../domain/value-objects/Cpf';
import { Address } from '../../../domain/value-objects/Address';
import { BirthDate } from '../../../domain/value-objects/BirthDate';
import { Gender } from '../../../domain/enums/Gender';

@injectable()
export class PassengerRepository implements IPassengerRepository {
  private ormRepo: Repository<PassengerSchema>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(PassengerSchema);
  }

  async create(passenger: Passenger): Promise<Passenger> {
    const entity = this.ormRepo.create({
      id: passenger.id,
      name: passenger.name,
      cpf: passenger.cpf.getValue(),
      birthDate: passenger.birthDate.value,
      gender: passenger.gender,
      street: passenger.address.street,
      number: passenger.address.number,
      city: passenger.address.city,
      state: passenger.address.state,
      zipCode: passenger.address.zipCode,
    });
    await this.ormRepo.save(entity);
    return passenger;
  }

  async findById(id: string): Promise<Passenger | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async findByCpf(cpf: string): Promise<Passenger | null> {
    const entity = await this.ormRepo.findOneBy({ cpf });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async findAll(): Promise<Passenger[]> {
    const entities = await this.ormRepo.find();
    return entities.map(this.toDomain);
  }

  async update(passenger: Passenger): Promise<Passenger> {
    await this.ormRepo.update(passenger.id, {
      name: passenger.name,
      birthDate: passenger.birthDate.value,
      gender: passenger.gender,
      street: passenger.address.street,
      number: passenger.address.number,
      city: passenger.address.city,
      state: passenger.address.state,
      zipCode: passenger.address.zipCode,
    });
    return passenger;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  private toDomain(entity: PassengerSchema): Passenger {
    return new Passenger(
      entity.id,
      entity.name,
      new Cpf(entity.cpf),
      new BirthDate(new Date(entity.birthDate)),
      entity.gender as Gender,
      new Address(entity.street, entity.number, entity.city, entity.state, entity.zipCode),
    );
  }
}
