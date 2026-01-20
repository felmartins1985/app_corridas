import { injectable, inject } from 'inversify';
import { IDriverRepository } from '../../../domain/repositories/IDriverRepository';
import { Driver } from '../../../domain/entities/Driver';
import { TYPES } from '../../../shared/container/types';
import { CreateDriverDTO } from '../../../presentation/dtos/DriverDTO';
import { Cpf } from '../../../domain/value-objects/Cpf';
import { BirthDate } from '../../../domain/value-objects/BirthDate';
import { Address } from '../../../domain/value-objects/Address';
import { Gender } from '../../../domain/enums/Gender';

@injectable()
export class CreateDriverUseCase {
  constructor(@inject(TYPES.DriverRepository) private driverRepository: IDriverRepository) {}

  async execute(data: CreateDriverDTO): Promise<Driver> {
    const cpf = new Cpf(data.cpf);
    const birthDate = new BirthDate(new Date(data.birthDate));
    const gender = Gender[data.gender];
    const address = new Address(
      data.address.street,
      data.address.number,
      data.address.city,
      data.address.state,
      data.address.zipCode,
    );

    const exists = await this.driverRepository.findByCpf(cpf.getValue());
    if (exists) throw new Error('CPF invalid-Already in use');

    const driver = new Driver(crypto.randomUUID(), data.name, cpf, birthDate, gender, address);

    return this.driverRepository.create(driver);
  }
}
