import { PassengerController } from '../../../src/presentation/controllers/PassengerController';
import { CreatePassengerUseCase } from '../../../src/application/use-cases/passenger/CreatePassengerUseCase';
import { GetPassengerUseCase } from '../../../src/application/use-cases/passenger/GetPassengerUseCase';
import { GetAllPassengersUseCase } from '../../../src/application/use-cases/passenger/GetAllPassengersUseCase';
import { UpdatePassengerUseCase } from '../../../src/application/use-cases/passenger/UpdatePassengerUseCase';
import { DeletePassengerUseCase } from '../../../src/application/use-cases/passenger/DeletePassengerUseCase';
import { Request, Response } from 'express';
import { createMockPassenger } from '../../__mocks__/entities.mock';

describe('PassengerController', () => {
  let passengerController: PassengerController;
  let mockCreatePassengerUseCase: jest.Mocked<CreatePassengerUseCase>;
  let mockGetPassengerUseCase: jest.Mocked<GetPassengerUseCase>;
  let mockGetAllPassengersUseCase: jest.Mocked<GetAllPassengersUseCase>;
  let mockUpdatePassengerUseCase: jest.Mocked<UpdatePassengerUseCase>;
  let mockDeletePassengerUseCase: jest.Mocked<DeletePassengerUseCase>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockCreatePassengerUseCase = {
      execute: jest.fn(),
    } as any;

    mockGetPassengerUseCase = {
      execute: jest.fn(),
    } as any;

    mockGetAllPassengersUseCase = {
      execute: jest.fn(),
    } as any;

    mockUpdatePassengerUseCase = {
      execute: jest.fn(),
    } as any;

    mockDeletePassengerUseCase = {
      execute: jest.fn(),
    } as any;

    mockRequest = {
      body: {},
      params: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    passengerController = new PassengerController(
      mockCreatePassengerUseCase,
      mockGetPassengerUseCase,
      mockGetAllPassengersUseCase,
      mockUpdatePassengerUseCase,
      mockDeletePassengerUseCase,
    );
  });

  describe('create', () => {
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

      mockRequest.body = createData;
      mockCreatePassengerUseCase.execute.mockResolvedValue(mockPassenger);

      await passengerController.create(mockRequest as Request, mockResponse as Response);

      expect(mockCreatePassengerUseCase.execute).toHaveBeenCalledWith(createData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPassenger);
    });

    it('should handle errors during creation', async () => {
      const error = new Error('CPF already exists');
      mockRequest.body = {};
      mockCreatePassengerUseCase.execute.mockRejectedValue(error);

      await passengerController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('getById', () => {
    it('should get a passenger by id successfully', async () => {
      const mockPassenger = createMockPassenger();
      mockRequest.params = { id: mockPassenger.id };
      mockGetPassengerUseCase.execute.mockResolvedValue(mockPassenger);

      await passengerController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockGetPassengerUseCase.execute).toHaveBeenCalledWith(mockPassenger.id);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPassenger);
    });

    it('should return 404 if passenger not found', async () => {
      mockRequest.params = { id: 'invalid-id' };
      mockGetPassengerUseCase.execute.mockResolvedValue(null);

      await passengerController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Passenger not found' });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      mockRequest.params = { id: 'passenger-123' };
      mockGetPassengerUseCase.execute.mockRejectedValue(error);

      await passengerController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('getAll', () => {
    it('should get all passengers successfully', async () => {
      const mockPassengers = [createMockPassenger(), createMockPassenger({ id: 'passenger-2' })];
      mockGetAllPassengersUseCase.execute.mockResolvedValue(mockPassengers);

      await passengerController.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockGetAllPassengersUseCase.execute).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPassengers);
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      mockGetAllPassengersUseCase.execute.mockRejectedValue(error);

      await passengerController.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('update', () => {
    it('should update a passenger successfully', async () => {
      const mockPassenger = createMockPassenger();
      const updateData = { name: 'New Name' };
      mockRequest.params = { id: mockPassenger.id };
      mockRequest.body = updateData;
      mockUpdatePassengerUseCase.execute.mockResolvedValue(mockPassenger);

      await passengerController.update(mockRequest as Request, mockResponse as Response);

      expect(mockUpdatePassengerUseCase.execute).toHaveBeenCalledWith({ id: mockPassenger.id, ...updateData });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPassenger);
    });

    it('should handle errors during update', async () => {
      const error = new Error('Passenger not found');
      mockRequest.params = { id: 'passenger-123' };
      mockRequest.body = { name: 'New Name' };
      mockUpdatePassengerUseCase.execute.mockRejectedValue(error);

      await passengerController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('delete', () => {
    it('should delete a passenger successfully', async () => {
      mockRequest.params = { id: 'passenger-123' };
      mockDeletePassengerUseCase.execute.mockResolvedValue(undefined);

      await passengerController.delete(mockRequest as Request, mockResponse as Response);

      expect(mockDeletePassengerUseCase.execute).toHaveBeenCalledWith('passenger-123');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Passenger successfully deleted' });
    });

    it('should handle errors during deletion', async () => {
      const error = new Error('Passenger not found');
      mockRequest.params = { id: 'passenger-123' };
      mockDeletePassengerUseCase.execute.mockRejectedValue(error);

      await passengerController.delete(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
});
