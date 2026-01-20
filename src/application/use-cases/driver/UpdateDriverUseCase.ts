import { injectable, inject } from 'inversify';
import { IDriverRepository } from '../../../domain/repositories/IDriverRepository';
import { Driver } from '../../../domain/entities/Driver';
import { TYPES } from '../../../shared/container/types';
import { UpdateDriverDTO } from '../../../presentation/dtos/DriverDTO';
import { Address } from '../../../domain/value-objects/Address';

interface UpdateDriverInput extends UpdateDriverDTO {
  id: string;
}

@injectable()
export class UpdateDriverUseCase {
  constructor(@inject(TYPES.DriverRepository) private driverRepository: IDriverRepository) {}

  async execute(data: UpdateDriverInput): Promise<Driver> {
    const existingDriver = await this.driverRepository.findById(data.id);
    if (!existingDriver) throw new Error('Driver not found');

    const address = new Address(
      data.address.street,
      data.address.number,
      data.address.city,
      data.address.state,
      data.address.zipCode,
    );

    const driver = new Driver(
      data.id,
      data.name,
      existingDriver.cpf,
      existingDriver.birthDate,
      existingDriver.gender,
      address,
    );

    return this.driverRepository.update(driver);
  }
}
