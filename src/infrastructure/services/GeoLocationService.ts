import { injectable } from 'inversify';
import { GeoLocation } from '@domain/value-objects/GeoLocation';
import { IGeoLocationService } from '@domain/services/IGeoLocationService';

@injectable()
export class GeoLocationService implements IGeoLocationService {
  private readonly EARTH_RADIUS_METERS = 6371000; // Raio da Terra em metros

  calculateDistance(origin: GeoLocation, destination: GeoLocation): number {
    const lat1 = this.toRadians(origin.latitude);
    const lat2 = this.toRadians(destination.latitude);
    const deltaLat = this.toRadians(destination.latitude - origin.latitude);
    const deltaLng = this.toRadians(destination.longitude - origin.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = this.EARTH_RADIUS_METERS * c;

    return Math.round(distance);
  }

  isWithinBounds(
    location: GeoLocation,
    bounds?: {
      minLat: number;
      maxLat: number;
      minLng: number;
      maxLng: number;
    },
  ): boolean {
    if (!bounds) {
      return true;
    }

    const { latitude, longitude } = location;

    return (
      latitude >= bounds.minLat &&
      latitude <= bounds.maxLat &&
      longitude >= bounds.minLng &&
      longitude <= bounds.maxLng
    );
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
