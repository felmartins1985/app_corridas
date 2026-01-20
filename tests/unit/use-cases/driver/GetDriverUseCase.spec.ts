import { GetDriverUseCase } from '../../../../src/application/use-cases/driver/GetDriverUseCase';
import { mockDriverRepository } from '../../../__mocks__/repositories.mock';
import { createMockDriver } from '../../../__mocks__/entities.mock';

describe('GetDriverUseCase', () => {
  let getDriverUseCase: GetDriverUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    getDriverUseCase = new GetDriverUseCase(mockDriverRepository);
  });

  it('should get a driver by id successfully', async () => {
    const mockDriver = createMockDriver();
    mockDriverRepository.findById.mockResolvedValue(mockDriver);

    const result = await getDriverUseCase.execute(mockDriver.id);

    expect(result).toEqual(mockDriver);
    expect(mockDriverRepository.findById).toHaveBeenCalledWith(mockDriver.id);
  });

  it('should return null if driver not found', async () => {
    mockDriverRepository.findById.mockResolvedValue(null);

    const result = await getDriverUseCase.execute('non-existent-id');

    expect(result).toBeNull();
  });
});
