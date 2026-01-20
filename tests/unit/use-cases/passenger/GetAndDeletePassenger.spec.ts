import { GetPassengerUseCase } from '@application/use-cases/passenger/GetPassengerUseCase';
import { DeletePassengerUseCase } from '@application/use-cases/passenger/DeletePassengerUseCase';
import { mockPassengerRepository } from '../../../__mocks__/repositories.mock';
import { createMockPassenger } from '../../../__mocks__/entities.mock';

describe('GetPassengerUseCase', () => {
  let getPassengerUseCase: GetPassengerUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    getPassengerUseCase = new GetPassengerUseCase(mockPassengerRepository);
  });

  it('should get a passenger by id', async () => {
    const mockPassenger = createMockPassenger();
    mockPassengerRepository.findById.mockResolvedValue(mockPassenger);

    const result = await getPassengerUseCase.execute(mockPassenger.id);

    expect(result).toEqual(mockPassenger);
    expect(mockPassengerRepository.findById).toHaveBeenCalledWith(mockPassenger.id);
  });

  it('should return null if passenger not found', async () => {
    mockPassengerRepository.findById.mockResolvedValue(null);

    const result = await getPassengerUseCase.execute('non-existent-id');

    expect(result).toBeNull();
  });
});

describe('DeletePassengerUseCase', () => {
  let deletePassengerUseCase: DeletePassengerUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    deletePassengerUseCase = new DeletePassengerUseCase(mockPassengerRepository);
  });

  it('should delete a passenger successfully', async () => {
    const mockPassenger = createMockPassenger();
    mockPassengerRepository.findById.mockResolvedValue(mockPassenger);
    mockPassengerRepository.delete.mockResolvedValue(undefined);

    await deletePassengerUseCase.execute(mockPassenger.id);

    expect(mockPassengerRepository.findById).toHaveBeenCalledWith(mockPassenger.id);
    expect(mockPassengerRepository.delete).toHaveBeenCalledWith(mockPassenger.id);
  });

  it('should throw error if passenger not found', async () => {
    mockPassengerRepository.findById.mockResolvedValue(null);

    await expect(deletePassengerUseCase.execute('non-existent-id')).rejects.toThrow();
  });
});
