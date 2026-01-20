import { injectable, inject } from 'inversify';
import { IPassengerRepository } from '../../../domain/repositories/IPassengerRepository';
import { TYPES } from '../../../shared/container/types';
import { AppError } from '../../../shared/errors/AppError';

@injectable()
export class DeletePassengerUseCase {
  constructor(
    @inject(TYPES.PassengerRepository) private passengerRepository: IPassengerRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const passenger = await this.passengerRepository.findById(id);
    if (!passenger) {
      throw new AppError('Passenger not found', 404);
    }
    return this.passengerRepository.delete(id);
  }
}
