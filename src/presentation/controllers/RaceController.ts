import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '@shared/container/types';
import { AcceptRaceUseCase } from '@application/use-cases/race/AcceptRaceUseCase';
import { AcceptRaceDTO } from '../dtos/RaceDTO';

@injectable()
export class RaceController {
  constructor(@inject(TYPES.AcceptRaceUseCase) private acceptRaceUseCase: AcceptRaceUseCase) {}

  async accept(req: Request, res: Response): Promise<Response> {
    try {
      const data: AcceptRaceDTO = req.body;
      const result = await this.acceptRaceUseCase.execute(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }
}
