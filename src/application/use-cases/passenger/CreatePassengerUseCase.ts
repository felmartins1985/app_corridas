import { injectable, inject } from 'inversify';
import { IPassengerRepository } from '../../../domain/repositories/IPassengerRepository';
import { Passenger } from '../../../domain/entities/Passenger';
import { TYPES } from '../../../shared/container/types';
import { CreatePassengerDTO } from '../../../presentation/dtos/PassengerDTO';
import { Cpf } from '../../../domain/value-objects/Cpf';
import { BirthDate } from '../../../domain/value-objects/BirthDate';
import { Address } from '../../../domain/value-objects/Address';
import { Gender } from '../../../domain/enums/Gender';

@injectable()
export class CreatePassengerUseCase {
  constructor(
    @inject(TYPES.PassengerRepository) private passengerRepository: IPassengerRepository,
  ) {}

  async execute(data: CreatePassengerDTO): Promise<Passenger> {
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

    const exists = await this.passengerRepository.findByCpf(cpf.getValue());
    if (exists) throw new Error('CPF invalid-Already in use');

    const passenger = new Passenger(
      crypto.randomUUID(),
      data.name,
      cpf,
      birthDate,
      gender,
      address,
    );

    return this.passengerRepository.create(passenger);
  }
}
