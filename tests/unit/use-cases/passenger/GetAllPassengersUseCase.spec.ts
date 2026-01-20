import { GetAllPassengersUseCase } from '../../../../src/application/use-cases/passenger/GetAllPassengersUseCase';
import { mockPassengerRepository } from '../../../__mocks__/repositories.mock';
import { createMockPassenger } from '../../../__mocks__/entities.mock';

describe('GetAllPassengersUseCase', () => {
  let getAllPassengersUseCase: GetAllPassengersUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    getAllPassengersUseCase = new GetAllPassengersUseCase(mockPassengerRepository);
  });

  it('should return all passengers', async () => {
    const passengers = [createMockPassenger(), createMockPassenger({ id: '2' })];
    mockPassengerRepository.findAll.mockResolvedValue(passengers);

    const result = await getAllPassengersUseCase.execute();

    expect(result).toEqual(passengers);
    expect(result).toHaveLength(2);
    expect(mockPassengerRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when no passengers exist', async () => {
    mockPassengerRepository.findAll.mockResolvedValue([]);

    const result = await getAllPassengersUseCase.execute();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
    expect(mockPassengerRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
