import { injectable, inject } from 'inversify';
import { IDriverRepository } from '../../../domain/repositories/IDriverRepository';
import { Driver } from '../../../domain/entities/Driver';
import { TYPES } from '../../../shared/container/types';

@injectable()
export class GetAllDriversUseCase {
  constructor(@inject(TYPES.DriverRepository) private driverRepository: IDriverRepository) {}

  async execute(): Promise<Driver[]> {
    return this.driverRepository.findAll();
  }
}
