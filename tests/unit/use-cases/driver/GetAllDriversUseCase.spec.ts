import { GetAllDriversUseCase } from '@application/use-cases/driver/GetAllDriversUseCase';
import { mockDriverRepository } from '../../../__mocks__/repositories.mock';
import { createMockDriver } from '../../../__mocks__/entities.mock';

describe('GetAllDriversUseCase', () => {
  let getAllDriversUseCase: GetAllDriversUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    getAllDriversUseCase = new GetAllDriversUseCase(mockDriverRepository);
  });

  it('should return all drivers', async () => {
    const drivers = [createMockDriver(), createMockDriver({ id: '2' })];
    mockDriverRepository.findAll.mockResolvedValue(drivers);

    const result = await getAllDriversUseCase.execute();

    expect(result).toEqual(drivers);
    expect(result).toHaveLength(2);
    expect(mockDriverRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when no drivers exist', async () => {
    mockDriverRepository.findAll.mockResolvedValue([]);

    const result = await getAllDriversUseCase.execute();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
    expect(mockDriverRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
