export class GeoLocation {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number,
  ) {
    if (!GeoLocation.isValid(latitude, longitude)) {
      throw new Error('GeoLocation invalid');
    }
  }

  static isValid(lat: number, lng: number): boolean {
    return (
      typeof lat === 'number' &&
      typeof lng === 'number' &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  }
}
