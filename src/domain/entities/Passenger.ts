import { Cpf } from '../value-objects/Cpf';
import { Address } from '../value-objects/Address';
import { BirthDate } from '../value-objects/BirthDate';
import { Gender } from '../enums/Gender';

export class Passenger {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly cpf: Cpf,
    public readonly birthDate: BirthDate,
    public readonly gender: Gender,
    public readonly address: Address,
  ) {
    if (!name) throw new Error('Name is required');
  }
}
