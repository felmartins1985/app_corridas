import { injectable, inject } from 'inversify';
import { IDriverRepository } from '../../../domain/repositories/IDriverRepository';
import { TYPES } from '../../../shared/container/types';
import { AppError } from '../../../shared/errors/AppError';

@injectable()
export class DeleteDriverUseCase {
  constructor(@inject(TYPES.DriverRepository) private driverRepository: IDriverRepository) {}

  async execute(id: string): Promise<void> {
    const driver = await this.driverRepository.findById(id);
    if (!driver) {
      throw new AppError('Driver not found', 404);
    }
    return this.driverRepository.delete(id);
  }
}
