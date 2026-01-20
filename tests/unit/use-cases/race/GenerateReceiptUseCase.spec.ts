import { GenerateReceiptUseCase } from '../../../../src/application/use-cases/race/GenerateReceiptUseCase';
import { mockFileStorageService } from '../../../__mocks__/services.mock';

describe('GenerateReceiptUseCase', () => {
  let generateReceiptUseCase: GenerateReceiptUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    generateReceiptUseCase = new GenerateReceiptUseCase(mockFileStorageService);
  });

  it('should generate and save receipt', async () => {
    const request = {
      raceId: '9f5dad93-ec43-4598-bfe3-20df79d48ed8',
      passengerId: '1c4f9d3b-9e8b-5e2c-0f7e-3d6b9e4f8g2b',
      driverId: '3a7c8d1b-4e6f-5c9d-2a1b-8e7f6d5c4b3a',
      price: 15.50,
      distanceMeters: 5000,
      date: new Date('2024-01-15T10:30:00'),
    };

    mockFileStorageService.saveJson.mockResolvedValue('/receipts/receipt-9f5dad93.json');

    const result = await generateReceiptUseCase.execute(request);

    expect(result).toBe('/receipts/receipt-9f5dad93.json');
    expect(mockFileStorageService.saveJson).toHaveBeenCalledTimes(1);
    expect(mockFileStorageService.saveJson.mock.calls[0][0]).toBe('receipt-9f5dad93-ec43-4598-bfe3-20df79d48ed8');
    const savedData = mockFileStorageService.saveJson.mock.calls[0][1];
    expect(savedData.raceId).toBe(request.raceId);
    expect(savedData.price).toBe(request.price);
  });

  it('should handle different race data', async () => {
    const request = {
      raceId: 'another-race-id',
      passengerId: 'passenger-2',
      driverId: 'driver-2',
      price: 32.75,
      distanceMeters: 10000,
      date: new Date('2024-02-20T14:45:00'),
    };

    mockFileStorageService.saveJson.mockResolvedValue('/receipts/receipt-another-race-id.json');

    const result = await generateReceiptUseCase.execute(request);

    expect(result).toBe('/receipts/receipt-another-race-id.json');
    expect(mockFileStorageService.saveJson).toHaveBeenCalledTimes(1);
  });

  it('should throw error if storage fails', async () => {
    const request = {
      raceId: '9f5dad93-ec43-4598-bfe3-20df79d48ed8',
      passengerId: '1c4f9d3b-9e8b-5e2c-0f7e-3d6b9e4f8g2b',
      driverId: '3a7c8d1b-4e6f-5c9d-2a1b-8e7f6d5c4b3a',
      price: 15.50,
      distanceMeters: 5000,
      date: new Date('2024-01-15T10:30:00'),
    };

    mockFileStorageService.saveJson.mockRejectedValue(new Error('Storage error'));

    await expect(generateReceiptUseCase.execute(request)).rejects.toThrow('Storage error');
  });
});
