import { UpdatePassengerUseCase } from '../../../../src/application/use-cases/passenger/UpdatePassengerUseCase';
import { mockPassengerRepository } from '../../../__mocks__/repositories.mock';
import { createMockPassenger } from '../../../__mocks__/entities.mock';
import { mockUpdatePassengerDTO } from '../../../__mocks__/dtos.mock';

describe('UpdatePassengerUseCase', () => {
  let updatePassengerUseCase: UpdatePassengerUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    updatePassengerUseCase = new UpdatePassengerUseCase(mockPassengerRepository);
  });

  it('should update a passenger successfully', async () => {
    const passenger = createMockPassenger();
    
    mockPassengerRepository.findById.mockResolvedValue(passenger);
    mockPassengerRepository.update.mockResolvedValue(passenger);

    const result = await updatePassengerUseCase.execute({ 
      id: passenger.id, 
      ...mockUpdatePassengerDTO 
    });

    expect(result).toBe(passenger);
    expect(mockPassengerRepository.findById).toHaveBeenCalledWith(passenger.id);
    expect(mockPassengerRepository.update).toHaveBeenCalledTimes(1);
  });

  it('should throw error if repository fails', async () => {
    const passenger = createMockPassenger();
    const error = new Error('Database error');
    
    mockPassengerRepository.findById.mockResolvedValue(passenger);
    mockPassengerRepository.update.mockRejectedValue(error);

    await expect(updatePassengerUseCase.execute({ 
      id: passenger.id, 
      ...mockUpdatePassengerDTO 
    })).rejects.toThrow('Database error');
  });
});
