import { injectable, inject } from 'inversify';
import { IPassengerRepository } from '../../../domain/repositories/IPassengerRepository';
import { Passenger } from '../../../domain/entities/Passenger';
import { TYPES } from '../../../shared/container/types';

@injectable()
export class GetPassengerUseCase {
  constructor(@inject(TYPES.PassengerRepository) private passengerRepository: IPassengerRepository) {}

  async execute(id: string): Promise<Passenger | null> {
    return this.passengerRepository.findById(id);
  }
}
