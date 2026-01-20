import { CalculateFareUseCase } from '@application/use-cases/fare/CalculateFareUseCase';
import { mockFareRequestRepository } from '../../../__mocks__/repositories.mock';
import { createMockFareCalculator, mockGeoLocationService } from '../../../__mocks__/services.mock';
import { mockCalculateFareDTO } from '../../../__mocks__/dtos.mock';
import { FareCalculator } from '@domain/services/FareCalculator';

describe('CalculateFareUseCase', () => {
  let calculateFareUseCase: CalculateFareUseCase;
  let fareCalculator: jest.Mocked<FareCalculator>;

  beforeEach(() => {
    jest.clearAllMocks();
    fareCalculator = createMockFareCalculator();
    mockGeoLocationService.calculateDistance.mockReturnValue(5000);
    calculateFareUseCase = new CalculateFareUseCase(
      fareCalculator,
      mockFareRequestRepository,
      mockGeoLocationService,
    );
  });

  it('should calculate fare and save request', async () => {
    fareCalculator.calculate.mockReturnValue(15.50);
    mockFareRequestRepository.create.mockResolvedValue(undefined as any);

    const result = await calculateFareUseCase.execute(mockCalculateFareDTO);

    expect(result.price).toBe(15.50);
    expect(result.distanceMeters).toBe(5000);
    expect(result.requestId).toBeDefined();
    expect(mockGeoLocationService.calculateDistance).toHaveBeenCalled();
    expect(fareCalculator.calculate).toHaveBeenCalledWith(5000, expect.any(Date));
    expect(mockFareRequestRepository.create).toHaveBeenCalledTimes(1);
    
    const savedRequest = mockFareRequestRepository.create.mock.calls[0][0];
    expect(savedRequest.passengerId).toBe(mockCalculateFareDTO.passengerId);
  });

  it('should handle different distances and dates', async () => {
    mockGeoLocationService.calculateDistance.mockReturnValue(10000);
    fareCalculator.calculate.mockReturnValue(32.75);
    mockFareRequestRepository.create.mockResolvedValue(undefined as any);

    const result = await calculateFareUseCase.execute(mockCalculateFareDTO);

    expect(result.price).toBe(32.75);
    expect(result.distanceMeters).toBe(10000);
    expect(fareCalculator.calculate).toHaveBeenCalledWith(10000, expect.any(Date));
  });

  it('should throw error if repository fails', async () => {
    fareCalculator.calculate.mockReturnValue(15.50);
    mockFareRequestRepository.create.mockRejectedValue(new Error('Database error'));

    await expect(calculateFareUseCase.execute(mockCalculateFareDTO)).rejects.toThrow('Database error');
  });
});
