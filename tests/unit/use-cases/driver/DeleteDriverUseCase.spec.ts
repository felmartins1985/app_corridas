import { DeleteDriverUseCase } from '../../../../src/application/use-cases/driver/DeleteDriverUseCase';
import { mockDriverRepository } from '../../../__mocks__/repositories.mock';
import { createMockDriver } from '../../../__mocks__/entities.mock';

describe('DeleteDriverUseCase', () => {
  let deleteDriverUseCase: DeleteDriverUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    deleteDriverUseCase = new DeleteDriverUseCase(mockDriverRepository);
  });

  it('should delete a driver successfully', async () => {
    const mockDriver = createMockDriver();
    mockDriverRepository.findById.mockResolvedValue(mockDriver);
    mockDriverRepository.delete.mockResolvedValue(undefined);

    await deleteDriverUseCase.execute(mockDriver.id);

    expect(mockDriverRepository.findById).toHaveBeenCalledWith(mockDriver.id);
    expect(mockDriverRepository.delete).toHaveBeenCalledWith(mockDriver.id);
  });

  it('should throw error if driver not found', async () => {
    mockDriverRepository.findById.mockResolvedValue(null);

    await expect(deleteDriverUseCase.execute('non-existent-id')).rejects.toThrow('Driver not found');
  });
});
