import { Router } from 'express';
import { container } from '@shared/container';
import { TYPES } from '@shared/container/types';
import { FareController } from '../controllers/FareController';
import { validate } from '../middlewares/validation';
import { calculateFareSchema } from '../schemas/fareSchemas';

const router = Router();

const fareController = container.get<FareController>(TYPES.FareController);

router.post('/calculate', validate(calculateFareSchema), (req, res) =>
  fareController.calculate(req, res),
);

export default router;
