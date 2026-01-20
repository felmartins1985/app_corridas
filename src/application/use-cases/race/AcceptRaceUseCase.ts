import { injectable, inject } from 'inversify';
import { Race } from '@domain/entities/Race';
import { GeoLocation } from '@domain/value-objects/GeoLocation';
import { IRaceRepository } from '@domain/repositories/IRaceRepository';
import { IDriverRepository } from '@domain/repositories/IDriverRepository';
import { IPassengerRepository } from '@domain/repositories/IPassengerRepository';
import { IGeoLocationService } from '@domain/services/IGeoLocationService';
import { FareCalculator } from '@domain/services/FareCalculator';
import { ReceiptQueueService } from '@infrastructure/services/ReceiptQueueService';
import { AcceptRaceDTO } from '@presentation/dtos/RaceDTO';
import { AppError } from '@shared/errors/AppError';
import { TYPES } from '@shared/container/types';

interface AcceptRaceResponse {
  race: Race;
  message: string;
  receiptJobId: string;
}

@injectable()
export class AcceptRaceUseCase {
  constructor(
    @inject(TYPES.RaceRepository) private raceRepository: IRaceRepository,
    @inject(TYPES.DriverRepository) private driverRepository: IDriverRepository,
    @inject(TYPES.PassengerRepository) private passengerRepository: IPassengerRepository,
    @inject(TYPES.ReceiptQueueService) private receiptQueueService: ReceiptQueueService,
    @inject(TYPES.GeoLocationService) private geoLocationService: IGeoLocationService,
    @inject(TYPES.FareCalculatorService) private fareCalculator: FareCalculator,
  ) {}

  async execute(data: AcceptRaceDTO): Promise<AcceptRaceResponse> {
    const driver = await this.driverRepository.findById(data.driverId);
    if (!driver) {
      throw new AppError('Driver not found', 404);
    }
    const passenger = await this.passengerRepository.findById(data.passengerId);
    if (!passenger) {
      throw new AppError('Passenger not found', 404);
    }

    const origin = new GeoLocation(data.originLat, data.originLng);
    const destination = new GeoLocation(data.destinationLat, data.destinationLng);
    const date = new Date(data.startDate);

    const distanceMeters = this.geoLocationService.calculateDistance(origin, destination);
    const price = this.fareCalculator.calculate(distanceMeters, date);

    const race = new Race(
      crypto.randomUUID(),
      data.passengerId,
      data.driverId,
      origin,
      destination,
      date,
      distanceMeters,
      price,
    );

    await this.raceRepository.create(race);

    const receiptJobId = await this.receiptQueueService.enqueueReceiptGeneration({
      raceId: race.id,
      passengerId: passenger.id,
      driverId: driver.id,
      price: race.price,
      distanceMeters: race.distanceMeters,
      date: race.date,
    });

    return {
      race,
      message: 'Race accepted successfully. Receipt will be generated shortly.',
      receiptJobId,
    };
  }
}
