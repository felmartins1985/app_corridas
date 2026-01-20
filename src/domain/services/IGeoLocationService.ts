import { GeoLocation } from '../value-objects/GeoLocation';

export interface IGeoLocationService {
  calculateDistance(origin: GeoLocation, destination: GeoLocation): number;
  isWithinBounds(
    location: GeoLocation,
    bounds?: {
      minLat: number;
      maxLat: number;
      minLng: number;
      maxLng: number;
    },
  ): boolean;
}
