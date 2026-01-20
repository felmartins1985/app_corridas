import { AcceptRaceUseCase } from '../../../../src/application/use-cases/race/AcceptRaceUseCase';
import { mockRaceRepository, mockDriverRepository, mockPassengerRepository } from '../../../__mocks__/repositories.mock';
import { createMockDriver, createMockPassenger } from '../../../__mocks__/entities.mock';
import { mockReceiptQueueService, mockGeoLocationService, createMockFareCalculator } from '../../../__mocks__/services.mock';
import { mockAcceptRaceDTO } from '../../../__mocks__/dtos.mock';
import { AppError } from '../../../../src/shared/errors/AppError';
import { FareCalculator } from '../../../../src/domain/services/FareCalculator';

describe('AcceptRaceUseCase', () => {
  let acceptRaceUseCase: AcceptRaceUseCase;
  let fareCalculator: jest.Mocked<FareCalculator>;

  beforeEach(() => {
    jest.clearAllMocks();
    fareCalculator = createMockFareCalculator();
    mockGeoLocationService.calculateDistance.mockReturnValue(5000);
    fareCalculator.calculate.mockReturnValue(15.50);
    
    acceptRaceUseCase = new AcceptRaceUseCase(
      mockRaceRepository,
      mockDriverRepository,
      mockPassengerRepository,
      mockReceiptQueueService,
      mockGeoLocationService,
      fareCalculator,
    );
  });

  it('should accept a race successfully', async () => {
    const driver = createMockDriver();
    const passenger = createMockPassenger();

    mockDriverRepository.findById.mockResolvedValue(driver);
    mockPassengerRepository.findById.mockResolvedValue(passenger);
    mockRaceRepository.create.mockResolvedValue(undefined as any);
    mockReceiptQueueService.enqueueReceiptGeneration.mockResolvedValue('job-123');

    const result = await acceptRaceUseCase.execute(mockAcceptRaceDTO);

    expect(result.race).toBeDefined();
    expect(result.race.passengerId).toBe(mockAcceptRaceDTO.passengerId);
    expect(result.race.driverId).toBe(mockAcceptRaceDTO.driverId);
    expect(result.race.price).toBe(15.50);
    expect(result.race.distanceMeters).toBe(5000);
    expect(result.message).toContain('Race accepted successfully');
    expect(result.receiptJobId).toBe('job-123');
    expect(mockGeoLocationService.calculateDistance).toHaveBeenCalled();
    expect(fareCalculator.calculate).toHaveBeenCalledWith(5000, expect.any(Date));
    expect(mockRaceRepository.create).toHaveBeenCalledTimes(1);
    expect(mockReceiptQueueService.enqueueReceiptGeneration).toHaveBeenCalledTimes(1);
  });

  it('should throw error if driver not found', async () => {
    mockDriverRepository.findById.mockResolvedValue(null);

    await expect(acceptRaceUseCase.execute(mockAcceptRaceDTO)).rejects.toThrow(AppError);
    await expect(acceptRaceUseCase.execute(mockAcceptRaceDTO)).rejects.toThrow('Driver not found');
  });

  it('should throw error if passenger not found', async () => {
    const driver = createMockDriver();

    mockDriverRepository.findById.mockResolvedValue(driver);
    mockPassengerRepository.findById.mockResolvedValue(null);

    await expect(acceptRaceUseCase.execute(mockAcceptRaceDTO)).rejects.toThrow(AppError);
    await expect(acceptRaceUseCase.execute(mockAcceptRaceDTO)).rejects.toThrow('Passenger not found');
  });
});
