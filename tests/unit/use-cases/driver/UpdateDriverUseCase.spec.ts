import { UpdateDriverUseCase } from '@application/use-cases/driver/UpdateDriverUseCase';
import { mockDriverRepository } from '../../../__mocks__/repositories.mock';
import { createMockDriver } from '../../../__mocks__/entities.mock';
import { mockUpdateDriverDTO } from '../../../__mocks__/dtos.mock';

describe('UpdateDriverUseCase', () => {
  let updateDriverUseCase: UpdateDriverUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    updateDriverUseCase = new UpdateDriverUseCase(mockDriverRepository);
  });

  it('should update a driver successfully', async () => {
    const existingDriver = createMockDriver();
    const updatedDriver = createMockDriver({ name: 'João Silva Atualizado' });
    
    mockDriverRepository.findById.mockResolvedValue(existingDriver);
    mockDriverRepository.update.mockResolvedValue(updatedDriver);

    const result = await updateDriverUseCase.execute({ 
      id: existingDriver.id, 
      ...mockUpdateDriverDTO 
    });

    expect(result).toBe(updatedDriver);
    expect(mockDriverRepository.findById).toHaveBeenCalledWith(existingDriver.id);
    expect(mockDriverRepository.update).toHaveBeenCalled();
  });

  it('should throw error if driver not found', async () => {
    mockDriverRepository.findById.mockResolvedValue(null);

    await expect(updateDriverUseCase.execute({ 
      id: 'non-existent-id', 
      ...mockUpdateDriverDTO 
    })).rejects.toThrow('Driver not found');
  });

  it('should throw error if repository fails', async () => {
    const existingDriver = createMockDriver();
    const error = new Error('Database error');
    
    mockDriverRepository.findById.mockResolvedValue(existingDriver);
    mockDriverRepository.update.mockRejectedValue(error);

    await expect(updateDriverUseCase.execute({ 
      id: existingDriver.id, 
      ...mockUpdateDriverDTO 
    })).rejects.toThrow('Database error');
  });
});
