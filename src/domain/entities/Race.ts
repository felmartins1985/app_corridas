import { GeoLocation } from '../value-objects/GeoLocation';

export class Race {
  constructor(
    public readonly id: string,
    public readonly passengerId: string,
    public readonly driverId: string,
    public readonly origin: GeoLocation,
    public readonly destination: GeoLocation,
    public readonly date: Date,
    public readonly distanceMeters: number,
    public readonly price: number,
  ) {}
}
