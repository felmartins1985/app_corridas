import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { TYPES } from '@shared/container/types';
import { CalculateFareUseCase } from '@application/use-cases/fare/CalculateFareUseCase';
import { CalculateFareDTO } from '../dtos/FareDTO';

@injectable()
export class FareController {
  constructor(
    @inject(TYPES.CalculateFareUseCase)
    private calculateFareUseCase: CalculateFareUseCase,
  ) {}

  async calculate(req: Request, res: Response): Promise<Response> {
    try {
      const data: CalculateFareDTO = req.body;
      const result = await this.calculateFareUseCase.execute(data);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }
}
