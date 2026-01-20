import { CreatePassengerUseCase } from '../../../../src/application/use-cases/passenger/CreatePassengerUseCase';
import { GetPassengerUseCase } from '../../../../src/application/use-cases/passenger/GetPassengerUseCase';
import { GetAllPassengersUseCase } from '../../../../src/application/use-cases/passenger/GetAllPassengersUseCase';
import { UpdatePassengerUseCase } from '../../../../src/application/use-cases/passenger/UpdatePassengerUseCase';
import { DeletePassengerUseCase } from '../../../../src/application/use-cases/passenger/DeletePassengerUseCase';
import { mockPassengerRepository } from '../../../__mocks__/repositories.mock';
import { createMockPassenger } from '../../../__mocks__/entities.mock';
import { mockCreatePassengerDTO, mockUpdatePassengerDTO } from '../../../__mocks__/dtos.mock';

describe('Passenger Use Cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CreatePassengerUseCase', () => {
    it('should create a passenger successfully', async () => {
      const useCase = new CreatePassengerUseCase(mockPassengerRepository);
      const mockPassenger = createMockPassenger();
      
      mockPassengerRepository.findByCpf.mockResolvedValue(null);
      mockPassengerRepository.create.mockResolvedValue(mockPassenger);

      const result = await useCase.execute(mockCreatePassengerDTO);

      expect(result).toEqual(mockPassenger);
      expect(mockPassengerRepository.create).toHaveBeenCalled();
    });

    it('should throw error if CPF already exists', async () => {
      const useCase = new CreatePassengerUseCase(mockPassengerRepository);
      const mockPassenger = createMockPassenger();
      
      mockPassengerRepository.findByCpf.mockResolvedValue(mockPassenger);

      await expect(useCase.execute(mockCreatePassengerDTO)).rejects.toThrow();
    });
  });

  describe('GetPassengerUseCase', () => {
    it('should get a passenger by id', async () => {
      const useCase = new GetPassengerUseCase(mockPassengerRepository);
      const mockPassenger = createMockPassenger();
      
      mockPassengerRepository.findById.mockResolvedValue(mockPassenger);

      const result = await useCase.execute(mockPassenger.id);

      expect(result).toEqual(mockPassenger);
    });
  });

  describe('GetAllPassengersUseCase', () => {
    it('should get all passengers', async () => {
      const useCase = new GetAllPassengersUseCase(mockPassengerRepository);
      const mockPassengers = [createMockPassenger()];
      
      mockPassengerRepository.findAll.mockResolvedValue(mockPassengers);

      const result = await useCase.execute();

      expect(result).toEqual(mockPassengers);
    });
  });

  describe('UpdatePassengerUseCase', () => {
    it('should update a passenger', async () => {
      const useCase = new UpdatePassengerUseCase(mockPassengerRepository);
      const mockPassenger = createMockPassenger();
      
      mockPassengerRepository.findById.mockResolvedValue(mockPassenger);
      mockPassengerRepository.update.mockResolvedValue(mockPassenger);

      const result = await useCase.execute({ id: mockPassenger.id, ...mockUpdatePassengerDTO });

      expect(result).toEqual(mockPassenger);
    });
  });

  describe('DeletePassengerUseCase', () => {
    it('should delete a passenger', async () => {
      const useCase = new DeletePassengerUseCase(mockPassengerRepository);
      const mockPassenger = createMockPassenger();
      
      mockPassengerRepository.findById.mockResolvedValue(mockPassenger);
      mockPassengerRepository.delete.mockResolvedValue(undefined);

      await useCase.execute(mockPassenger.id);

      expect(mockPassengerRepository.delete).toHaveBeenCalledWith(mockPassenger.id);
    });
  });
});
