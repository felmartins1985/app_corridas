import { injectable, inject } from 'inversify';
import { FareCalculator } from '../../../domain/services/FareCalculator';
import { IFareRequestRepository } from '../../../domain/repositories/IFareRequestRepository';
import { FareRequest } from '../../../domain/entities/FareRequest';
import { GeoLocation } from '../../../domain/value-objects/GeoLocation';
import { IGeoLocationService } from '../../../domain/services/IGeoLocationService';
import { CalculateFareDTO } from '../../../presentation/dtos/FareDTO';
import { TYPES } from '../../../shared/container/types';

export interface CalculateFareOutput {
  price: number;
  requestId: string;
  distanceMeters: number;
}

@injectable()
export class CalculateFareUseCase {
  constructor(
    @inject(TYPES.FareCalculatorService) private fareCalculator: FareCalculator,
    @inject(TYPES.FareRequestRepository) private fareRequestRepository: IFareRequestRepository,
    @inject(TYPES.GeoLocationService) private geoLocationService: IGeoLocationService,
  ) {}

  async execute(data: CalculateFareDTO): Promise<CalculateFareOutput> {
    const origin = new GeoLocation(data.originLat, data.originLng);
    const destination = new GeoLocation(data.destinationLat, data.destinationLng);
    const date = new Date(data.date);

    const distanceMeters = this.geoLocationService.calculateDistance(origin, destination);

    const price = this.fareCalculator.calculate(distanceMeters, date);
    const requestId = crypto.randomUUID();

    const fareRequest = new FareRequest(requestId, data.passengerId, origin, destination, date);

    await this.fareRequestRepository.create(fareRequest);

    return {
      price,
      requestId,
      distanceMeters,
    };
  }
}
