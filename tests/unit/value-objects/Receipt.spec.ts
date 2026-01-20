import { Receipt } from '../../../src/domain/value-objects/Receipt';

describe('Receipt', () => {
  const mockReceiptData = {
    raceId: '9f5dad93-ec43-4598-bfe3-20df79d48ed8',
    passengerId: '1c4f9d3b-9e8b-5e2c-0f7e-3d6b9e4f8g2b',
    driverId: '3a7c8d1b-4e6f-5c9d-2a1b-8e7f6d5c4b3a',
    date: new Date('2024-01-15T10:30:00'),
    price: 25.50,
    distanceMeters: 8500,
  };

  it('should create a receipt with all properties', () => {
    const receipt = new Receipt(
      mockReceiptData.raceId,
      mockReceiptData.passengerId,
      mockReceiptData.driverId,
      mockReceiptData.date,
      mockReceiptData.price,
      mockReceiptData.distanceMeters
    );

    expect(receipt.raceId).toBe(mockReceiptData.raceId);
    expect(receipt.passengerId).toBe(mockReceiptData.passengerId);
    expect(receipt.driverId).toBe(mockReceiptData.driverId);
    expect(receipt.date).toEqual(mockReceiptData.date);
    expect(receipt.price).toBe(mockReceiptData.price);
    expect(receipt.distanceMeters).toBe(mockReceiptData.distanceMeters);
  });

  it('should convert receipt to JSON string', () => {
    const receipt = new Receipt(
      mockReceiptData.raceId,
      mockReceiptData.passengerId,
      mockReceiptData.driverId,
      mockReceiptData.date,
      mockReceiptData.price,
      mockReceiptData.distanceMeters
    );

    const json = receipt.toJSON();
    const parsed = JSON.parse(json);

    expect(parsed.raceId).toBe(mockReceiptData.raceId);
    expect(parsed.passengerId).toBe(mockReceiptData.passengerId);
    expect(parsed.driverId).toBe(mockReceiptData.driverId);
    expect(parsed.price).toBe(mockReceiptData.price);
    expect(parsed.distanceMeters).toBe(mockReceiptData.distanceMeters);
  });

  it('should have correct distance in kilometers', () => {
    const receipt = new Receipt(
      mockReceiptData.raceId,
      mockReceiptData.passengerId,
      mockReceiptData.driverId,
      mockReceiptData.date,
      mockReceiptData.price,
      mockReceiptData.distanceMeters
    );

    const distanceKm = receipt.distanceMeters / 1000;

    expect(distanceKm).toBe(8.5);
    expect(receipt.price).toBe(25.50);
    expect(receipt.raceId).toBe(mockReceiptData.raceId);
  });
});
