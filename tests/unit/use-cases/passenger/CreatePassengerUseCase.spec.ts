import { CreatePassengerUseCase } from '../../../../src/application/use-cases/passenger/CreatePassengerUseCase';
import { mockPassengerRepository } from '../../../__mocks__/repositories.mock';
import { createMockPassenger } from '../../../__mocks__/entities.mock';

describe('CreatePassengerUseCase', () => {
  let createPassengerUseCase: CreatePassengerUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createPassengerUseCase = new CreatePassengerUseCase(mockPassengerRepository);
  });

  it('should create a passenger successfully', async () => {
    const mockPassenger = createMockPassenger();
    const createData = {
      name: 'Maria Santos',
      cpf: '12345678909',
      birthDate: '1995-05-15',
      gender: 'FEMALE' as const,
      address: {
        street: 'Avenida Principal',
        number: '456',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '02000-000',
      },
    };
    
    mockPassengerRepository.findByCpf.mockResolvedValue(null);
    mockPassengerRepository.create.mockResolvedValue(mockPassenger);

    const result = await createPassengerUseCase.execute(createData);

    expect(result).toEqual(mockPassenger);
    expect(mockPassengerRepository.findByCpf).toHaveBeenCalledWith('123.456.789-09');
    expect(mockPassengerRepository.create).toHaveBeenCalled();
  });

  it('should throw error if CPF already exists', async () => {
    const mockPassenger = createMockPassenger();
    const createData = {
      name: 'Maria Santos',
      cpf: '12345678909',
      birthDate: '1995-05-15',
      gender: 'FEMALE' as const,
      address: {
        street: 'Avenida Principal',
        number: '456',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '02000-000',
      },
    };
    
    mockPassengerRepository.findByCpf.mockResolvedValue(mockPassenger);

    await expect(createPassengerUseCase.execute(createData)).rejects.toThrow();
    expect(mockPassengerRepository.create).not.toHaveBeenCalled();
  });

  it('should throw error if repository fails', async () => {
    const createData = {
      name: 'Maria Santos',
      cpf: '12345678909',
      birthDate: '1995-05-15',
      gender: 'FEMALE' as const,
      address: {
        street: 'Avenida Principal',
        number: '456',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '02000-000',
      },
    };
    const error = new Error('Database error');
    
    mockPassengerRepository.findByCpf.mockResolvedValue(null);
    mockPassengerRepository.create.mockRejectedValue(error);

    await expect(createPassengerUseCase.execute(createData)).rejects.toThrow('Database error');
  });
});
