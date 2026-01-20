import { injectable, inject } from 'inversify';
import { IPassengerRepository } from '../../../domain/repositories/IPassengerRepository';
import { Passenger } from '../../../domain/entities/Passenger';
import { TYPES } from '../../../shared/container/types';
import { UpdatePassengerDTO } from '../../../presentation/dtos/PassengerDTO';
import { Address } from '../../../domain/value-objects/Address';

interface UpdatePassengerInput extends UpdatePassengerDTO {
  id: string;
}

@injectable()
export class UpdatePassengerUseCase {
  constructor(
    @inject(TYPES.PassengerRepository) private passengerRepository: IPassengerRepository,
  ) {}

  async execute(data: UpdatePassengerInput): Promise<Passenger> {
    const existingPassenger = await this.passengerRepository.findById(data.id);
    if (!existingPassenger) throw new Error('Passenger not found');

    const address = new Address(
      data.address.street,
      data.address.number,
      data.address.city,
      data.address.state,
      data.address.zipCode,
    );

    const passenger = new Passenger(
      data.id,
      data.name,
      existingPassenger.cpf,
      existingPassenger.birthDate,
      existingPassenger.gender,
      address,
    );

    return this.passengerRepository.update(passenger);
  }
}
