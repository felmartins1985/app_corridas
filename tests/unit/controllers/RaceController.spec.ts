import { RaceController } from '@presentation/controllers/RaceController';
import { AcceptRaceUseCase } from '@application/use-cases/race/AcceptRaceUseCase';
import { FareCalculator } from '@domain/services/FareCalculator';
import { IGeoLocationService } from '@domain/services/IGeoLocationService';
import { Request, Response } from 'express';

describe('RaceController', () => {
  let raceController: RaceController;
  let mockAcceptRaceUseCase: jest.Mocked<AcceptRaceUseCase>;
  let mockFareCalculator: jest.Mocked<FareCalculator>;
  let mockGeoLocationService: jest.Mocked<IGeoLocationService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockAcceptRaceUseCase = {
      execute: jest.fn(),
    } as any;

    mockFareCalculator = {
      calculate: jest.fn(),
    } as any;

    mockGeoLocationService = {
      calculateDistance: jest.fn(),
      isWithinBounds: jest.fn(),
    } as any;

    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    raceController = new RaceController(
      mockAcceptRaceUseCase
    );
  });

  it('should accept race successfully', async () => {
    mockRequest.body = {
      passengerId: 'passenger-123',
      driverId: 'driver-456',
      originLat: -23.5505,
      originLng: -46.6333,
      destinationLat: -23.5629,
      destinationLng: -46.6544,
      startDate: '2024-01-15T10:00:00',
    };

    mockAcceptRaceUseCase.execute.mockResolvedValue({
      race: {} as any,
      message: 'Race accepted successfully',
      receiptJobId: 'job-123',
    });

    await raceController.accept(mockRequest as Request, mockResponse as Response);

    expect(mockAcceptRaceUseCase.execute).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Race accepted successfully',
        receiptJobId: 'job-123',
      })
    );
  });

  it('should handle errors', async () => {
    mockRequest.body = {
      passengerId: 'passenger-123',
      driverId: 'driver-456',
      originLat: -23.5505,
      originLng: -46.6333,
      destinationLat: -23.5629,
      destinationLng: -46.6544,
      startDate: '2024-01-15T10:00:00',
    };

    const error = new Error('Race acceptance failed');
    mockGeoLocationService.calculateDistance.mockReturnValue(5000);
    mockFareCalculator.calculate.mockReturnValue(14.0);
    mockAcceptRaceUseCase.execute.mockRejectedValue(error);

    await raceController.accept(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Race acceptance failed' });
  });

  it('should handle errors with custom status code', async () => {
    mockRequest.body = {
      passengerId: 'passenger-123',
      driverId: 'driver-456',
      originLat: -23.5505,
      originLng: -46.6333,
      destinationLat: -23.5629,
      destinationLng: -46.6544,
      startDate: '2024-01-15T10:00:00',
    };

    const error: any = new Error('Driver not found');
    error.statusCode = 404;
    mockGeoLocationService.calculateDistance.mockReturnValue(5000);
    mockFareCalculator.calculate.mockReturnValue(14.0);
    mockAcceptRaceUseCase.execute.mockRejectedValue(error);

    await raceController.accept(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Driver not found' });
  });
});
