import { DriverController } from '../../../src/presentation/controllers/DriverController';
import { CreateDriverUseCase } from '../../../src/application/use-cases/driver/CreateDriverUseCase';
import { GetDriverUseCase } from '../../../src/application/use-cases/driver/GetDriverUseCase';
import { GetAllDriversUseCase } from '../../../src/application/use-cases/driver/GetAllDriversUseCase';
import { UpdateDriverUseCase } from '../../../src/application/use-cases/driver/UpdateDriverUseCase';
import { DeleteDriverUseCase } from '../../../src/application/use-cases/driver/DeleteDriverUseCase';
import { Request, Response } from 'express';
import { createMockDriver } from '../../__mocks__/entities.mock';

describe('DriverController', () => {
  let driverController: DriverController;
  let mockCreateDriverUseCase: jest.Mocked<CreateDriverUseCase>;
  let mockGetDriverUseCase: jest.Mocked<GetDriverUseCase>;
  let mockGetAllDriversUseCase: jest.Mocked<GetAllDriversUseCase>;
  let mockUpdateDriverUseCase: jest.Mocked<UpdateDriverUseCase>;
  let mockDeleteDriverUseCase: jest.Mocked<DeleteDriverUseCase>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockCreateDriverUseCase = {
      execute: jest.fn(),
    } as any;

    mockGetDriverUseCase = {
      execute: jest.fn(),
    } as any;

    mockGetAllDriversUseCase = {
      execute: jest.fn(),
    } as any;

    mockUpdateDriverUseCase = {
      execute: jest.fn(),
    } as any;

    mockDeleteDriverUseCase = {
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

    driverController = new DriverController(
      mockCreateDriverUseCase,
      mockGetDriverUseCase,
      mockGetAllDriversUseCase,
      mockUpdateDriverUseCase,
      mockDeleteDriverUseCase,
    );
  });

  describe('create', () => {
    it('should create a driver successfully', async () => {
      const mockDriver = createMockDriver();
      const createData = {
        name: 'João Silva',
        cpf: '11144477735',
        birthDate: '1990-01-01',
        gender: 'MALE' as const,
        address: {
          street: 'Rua Teste',
          number: '123',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01000-000',
        },
      };

      mockRequest.body = createData;
      mockCreateDriverUseCase.execute.mockResolvedValue(mockDriver);

      await driverController.create(mockRequest as Request, mockResponse as Response);

      expect(mockCreateDriverUseCase.execute).toHaveBeenCalledWith(createData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDriver);
    });

    it('should handle errors during creation', async () => {
      const error = new Error('CPF already exists');
      mockRequest.body = {};
      mockCreateDriverUseCase.execute.mockRejectedValue(error);

      await driverController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('getById', () => {
    it('should get a driver by id successfully', async () => {
      const mockDriver = createMockDriver();
      mockRequest.params = { id: mockDriver.id };
      mockGetDriverUseCase.execute.mockResolvedValue(mockDriver);

      await driverController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockGetDriverUseCase.execute).toHaveBeenCalledWith(mockDriver.id);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDriver);
    });

    it('should return 404 if driver not found', async () => {
      mockRequest.params = { id: 'invalid-id' };
      mockGetDriverUseCase.execute.mockResolvedValue(null);

      await driverController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Driver not found' });
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      mockRequest.params = { id: 'driver-123' };
      mockGetDriverUseCase.execute.mockRejectedValue(error);

      await driverController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('getAll', () => {
    it('should get all drivers successfully', async () => {
      const mockDrivers = [createMockDriver(), createMockDriver({ id: 'driver-2' })];
      mockGetAllDriversUseCase.execute.mockResolvedValue(mockDrivers);

      await driverController.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockGetAllDriversUseCase.execute).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDrivers);
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      mockGetAllDriversUseCase.execute.mockRejectedValue(error);

      await driverController.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('update', () => {
    it('should update a driver successfully', async () => {
      const mockDriver = createMockDriver();
      const updateData = { name: 'New Name' };
      mockRequest.params = { id: mockDriver.id };
      mockRequest.body = updateData;
      mockUpdateDriverUseCase.execute.mockResolvedValue(mockDriver);

      await driverController.update(mockRequest as Request, mockResponse as Response);

      expect(mockUpdateDriverUseCase.execute).toHaveBeenCalledWith({ id: mockDriver.id, ...updateData });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDriver);
    });

    it('should handle errors during update', async () => {
      const error = new Error('Driver not found');
      mockRequest.params = { id: 'driver-123' };
      mockRequest.body = { name: 'New Name' };
      mockUpdateDriverUseCase.execute.mockRejectedValue(error);

      await driverController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('delete', () => {
    it('should delete a driver successfully', async () => {
      mockRequest.params = { id: 'driver-123' };
      mockDeleteDriverUseCase.execute.mockResolvedValue(undefined);

      await driverController.delete(mockRequest as Request, mockResponse as Response);

      expect(mockDeleteDriverUseCase.execute).toHaveBeenCalledWith('driver-123');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Driver successfully deleted' });
    });

    it('should handle errors during deletion', async () => {
      const error = new Error('Driver not found');
      mockRequest.params = { id: 'driver-123' };
      mockDeleteDriverUseCase.execute.mockRejectedValue(error);

      await driverController.delete(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
});
