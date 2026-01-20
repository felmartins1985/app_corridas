import { GeoLocation } from '../value-objects/GeoLocation';

export class FareRequest {
  constructor(
    public readonly id: string,
    public readonly passengerId: string,
    public readonly origin: GeoLocation,
    public readonly destination: GeoLocation,
    public readonly date: Date,
  ) {}
}
