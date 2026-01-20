import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '@shared/container/types';
import { CreatePassengerUseCase } from '@application/use-cases/passenger/CreatePassengerUseCase';
import { GetPassengerUseCase } from '@application/use-cases/passenger/GetPassengerUseCase';
import { GetAllPassengersUseCase } from '@application/use-cases/passenger/GetAllPassengersUseCase';
import { UpdatePassengerUseCase } from '@application/use-cases/passenger/UpdatePassengerUseCase';
import { DeletePassengerUseCase } from '@application/use-cases/passenger/DeletePassengerUseCase';
import { CreatePassengerDTO, UpdatePassengerDTO } from '../dtos/PassengerDTO';

@injectable()
export class PassengerController {
  constructor(
    @inject(TYPES.CreatePassengerUseCase)
    private createPassengerUseCase: CreatePassengerUseCase,
    @inject(TYPES.GetPassengerUseCase) private getPassengerUseCase: GetPassengerUseCase,
    @inject(TYPES.GetAllPassengersUseCase)
    private getAllPassengersUseCase: GetAllPassengersUseCase,
    @inject(TYPES.UpdatePassengerUseCase)
    private updatePassengerUseCase: UpdatePassengerUseCase,
    @inject(TYPES.DeletePassengerUseCase)
    private deletePassengerUseCase: DeletePassengerUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data: CreatePassengerDTO = req.body;
      const passenger = await this.createPassengerUseCase.execute(data);
      return res.status(201).json(passenger);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const passenger = await this.getPassengerUseCase.execute(id);

      if (!passenger) {
        return res.status(404).json({ error: 'Passenger not found' });
      }

      return res.status(200).json(passenger);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const passengers = await this.getAllPassengersUseCase.execute();
      return res.status(200).json(passengers);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data: UpdatePassengerDTO = req.body;
      const passenger = await this.updatePassengerUseCase.execute({ id, ...data });
      return res.status(200).json(passenger);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deletePassengerUseCase.execute(id);
      return res.status(200).json({ message: 'Passenger successfully deleted' });
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }
}
