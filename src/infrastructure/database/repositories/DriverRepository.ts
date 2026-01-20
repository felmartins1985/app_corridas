import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { DriverSchema } from '../schemas/DriverSchema';
import { IDriverRepository } from '../../../domain/repositories/IDriverRepository';
import { Driver } from '../../../domain/entities/Driver';
import { Cpf } from '../../../domain/value-objects/Cpf';
import { Address } from '../../../domain/value-objects/Address';
import { BirthDate } from '../../../domain/value-objects/BirthDate';
import { Gender } from '../../../domain/enums/Gender';

@injectable()
export class DriverRepository implements IDriverRepository {
  private ormRepo: Repository<DriverSchema>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(DriverSchema);
  }

  async create(driver: Driver): Promise<Driver> {
    const entity = this.ormRepo.create({
      id: driver.id,
      name: driver.name,
      cpf: driver.cpf.getValue(),
      birthDate: driver.birthDate.value,
      gender: driver.gender,
      street: driver.address.street,
      number: driver.address.number,
      city: driver.address.city,
      state: driver.address.state,
      zipCode: driver.address.zipCode,
    });
    await this.ormRepo.save(entity);
    return driver;
  }

  async findById(id: string): Promise<Driver | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async findByCpf(cpf: string): Promise<Driver | null> {
    const entity = await this.ormRepo.findOneBy({ cpf });
    if (!entity) return null;
    return this.toDomain(entity);
  }

  async findAll(): Promise<Driver[]> {
    const entities = await this.ormRepo.find();
    return entities.map(this.toDomain);
  }

  async update(driver: Driver): Promise<Driver> {
    await this.ormRepo.update(driver.id, {
      name: driver.name,
      birthDate: driver.birthDate.value,
      gender: driver.gender,
      street: driver.address.street,
      number: driver.address.number,
      city: driver.address.city,
      state: driver.address.state,
      zipCode: driver.address.zipCode,
    });
    return driver;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  private toDomain(entity: DriverSchema): Driver {
    return new Driver(
      entity.id,
      entity.name,
      new Cpf(entity.cpf),
      new BirthDate(new Date(entity.birthDate)),
      entity.gender as Gender,
      new Address(entity.street, entity.number, entity.city, entity.state, entity.zipCode),
    );
  }
}
