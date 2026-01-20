import { FareController } from '@presentation/controllers/FareController';
import { CalculateFareUseCase } from '@application/use-cases/fare/CalculateFareUseCase';
import { IGeoLocationService } from '@domain/services/IGeoLocationService';
import { Request, Response } from 'express';

describe('FareController', () => {
  let fareController: FareController;
  let mockCalculateFareUseCase: jest.Mocked<CalculateFareUseCase>;
  let mockGeoLocationService: jest.Mocked<IGeoLocationService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockCalculateFareUseCase = {
      execute: jest.fn(),
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

    fareController = new FareController(mockCalculateFareUseCase);
  });

  it('should calculate fare successfully', async () => {
    mockRequest.body = {
      originLat: -23.5505,
      originLng: -46.6333,
      destinationLat: -23.5629,
      destinationLng: -46.6544,
      date: '2024-01-15T10:00:00',
      passengerId: 'passenger-123',
    };

    mockCalculateFareUseCase.execute.mockResolvedValue({
      price: 14.0,
      requestId: 'request-123',
      distanceMeters: 5000,
    });

    await fareController.calculate(mockRequest as Request, mockResponse as Response);

    expect(mockCalculateFareUseCase.execute).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      price: 14.0,
      requestId: 'request-123',
      distanceMeters: 5000,
    });
  });

  it('should handle errors', async () => {
    mockRequest.body = {
      originLat: -23.5505,
      originLng: -46.6333,
      destinationLat: -23.5629,
      destinationLng: -46.6544,
      date: '2024-01-15T10:00:00',
      passengerId: 'passenger-123',
    };

    const error = new Error('Calculation failed');
    mockGeoLocationService.calculateDistance.mockReturnValue(5000);
    mockCalculateFareUseCase.execute.mockRejectedValue(error);

    await fareController.calculate(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Calculation failed' });
  });

  it('should handle errors with status code', async () => {
    mockRequest.body = {
      originLat: -23.5505,
      originLng: -46.6333,
      destinationLat: -23.5629,
      destinationLng: -46.6544,
      date: '2024-01-15T10:00:00',
      passengerId: 'passenger-123',
    };

    const error: any = new Error('Not found');
    error.statusCode = 404;
    mockGeoLocationService.calculateDistance.mockReturnValue(5000);
    mockCalculateFareUseCase.execute.mockRejectedValue(error);

    await fareController.calculate(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Not found' });
  });
});
