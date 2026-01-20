import { CreateDriverUseCase } from '../../../../src/application/use-cases/driver/CreateDriverUseCase';
import { mockDriverRepository } from '../../../__mocks__/repositories.mock';
import { createMockDriver } from '../../../__mocks__/entities.mock';
import { mockCreateDriverDTO } from '../../../__mocks__/dtos.mock';

describe('CreateDriverUseCase', () => {
  let createDriverUseCase: CreateDriverUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createDriverUseCase = new CreateDriverUseCase(mockDriverRepository);
  });

  it('should create a driver successfully', async () => {
    const mockDriver = createMockDriver();
    mockDriverRepository.findByCpf.mockResolvedValue(null);
    mockDriverRepository.create.mockResolvedValue(mockDriver);

    const result = await createDriverUseCase.execute(mockCreateDriverDTO);

    expect(result).toEqual(mockDriver);
    expect(mockDriverRepository.findByCpf).toHaveBeenCalledWith('111.444.777-35');
    expect(mockDriverRepository.create).toHaveBeenCalled();
  });

  it('should throw error if CPF already exists', async () => {
    const mockDriver = createMockDriver();
    mockDriverRepository.findByCpf.mockResolvedValue(mockDriver);

    await expect(createDriverUseCase.execute(mockCreateDriverDTO)).rejects.toThrow('CPF invalid-Already in use');
  });

  it('should throw error if repository fails', async () => {
    mockDriverRepository.findByCpf.mockResolvedValue(null);
    mockDriverRepository.create.mockRejectedValue(new Error('Database error'));

    await expect(createDriverUseCase.execute(mockCreateDriverDTO)).rejects.toThrow('Database error');
  });
});
