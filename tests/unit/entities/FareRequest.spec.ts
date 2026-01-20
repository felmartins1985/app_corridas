import { FareRequest } from '@domain/entities/FareRequest';
import { GeoLocation } from '@domain/value-objects/GeoLocation';

describe('FareRequest', () => {
  it('should create a FareRequest with all properties', () => {
    const origin = new GeoLocation(-23.5505, -46.6333);
    const destination = new GeoLocation(-23.5629, -46.6544);
    const date = new Date('2024-01-15T10:30:00');
    const id = 'fare-request-123';
    const passengerId = 'passenger-456';

    const fareRequest = new FareRequest(id, passengerId, origin, destination, date);

    expect(fareRequest.id).toBe(id);
    expect(fareRequest.passengerId).toBe(passengerId);
    expect(fareRequest.origin).toBe(origin);
    expect(fareRequest.destination).toBe(destination);
    expect(fareRequest.date).toEqual(date);
  });

  it('should allow creating FareRequest with different coordinates', () => {
    const origin = new GeoLocation(-22.9068, -43.1729);
    const destination = new GeoLocation(-22.9519, -43.2105);
    const date = new Date('2024-02-20T14:45:00');
    const id = 'fare-request-789';
    const passengerId = 'passenger-012';

    const fareRequest = new FareRequest(id, passengerId, origin, destination, date);

    expect(fareRequest.id).toBe(id);
    expect(fareRequest.passengerId).toBe(passengerId);
    expect(fareRequest.origin.latitude).toBe(-22.9068);
    expect(fareRequest.origin.longitude).toBe(-43.1729);
    expect(fareRequest.destination.latitude).toBe(-22.9519);
    expect(fareRequest.destination.longitude).toBe(-43.2105);
    expect(fareRequest.date).toEqual(date);
  });
});
