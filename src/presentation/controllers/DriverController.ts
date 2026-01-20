import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '@shared/container/types';
import { CreateDriverUseCase } from '@application/use-cases/driver/CreateDriverUseCase';
import { GetDriverUseCase } from '@application/use-cases/driver/GetDriverUseCase';
import { GetAllDriversUseCase } from '@application/use-cases/driver/GetAllDriversUseCase';
import { UpdateDriverUseCase } from '@application/use-cases/driver/UpdateDriverUseCase';
import { DeleteDriverUseCase } from '@application/use-cases/driver/DeleteDriverUseCase';
import { CreateDriverDTO, UpdateDriverDTO } from '../dtos/DriverDTO';

@injectable()
export class DriverController {
  constructor(
    @inject(TYPES.CreateDriverUseCase) private createDriverUseCase: CreateDriverUseCase,
    @inject(TYPES.GetDriverUseCase) private getDriverUseCase: GetDriverUseCase,
    @inject(TYPES.GetAllDriversUseCase) private getAllDriversUseCase: GetAllDriversUseCase,
    @inject(TYPES.UpdateDriverUseCase) private updateDriverUseCase: UpdateDriverUseCase,
    @inject(TYPES.DeleteDriverUseCase) private deleteDriverUseCase: DeleteDriverUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data: CreateDriverDTO = req.body;
      const driver = await this.createDriverUseCase.execute(data);
      return res.status(201).json(driver);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const driver = await this.getDriverUseCase.execute(id);

      if (!driver) {
        return res.status(404).json({ error: 'Driver not found' });
      }

      return res.status(200).json(driver);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const drivers = await this.getAllDriversUseCase.execute();
      return res.status(200).json(drivers);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data: UpdateDriverDTO = req.body;
      const driver = await this.updateDriverUseCase.execute({ id, ...data });
      return res.status(200).json(driver);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteDriverUseCase.execute(id);
      return res.status(200).json({ message: 'Driver successfully deleted' });
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }
}
