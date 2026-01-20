import { injectable, inject } from 'inversify';
import { IDriverRepository } from '../../../domain/repositories/IDriverRepository';
import { Driver } from '../../../domain/entities/Driver';
import { TYPES } from '../../../shared/container/types';

@injectable()
export class GetDriverUseCase {
  constructor(@inject(TYPES.DriverRepository) private driverRepository: IDriverRepository) {}

  async execute(id: string): Promise<Driver | null> {
    return this.driverRepository.findById(id);
  }
}
