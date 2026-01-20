import { Router } from 'express';
import { container } from '@shared/container';
import { TYPES } from '@shared/container/types';
import { RaceController } from '../controllers/RaceController';
import { validate } from '../middlewares/validation';
import { acceptRaceSchema } from '../schemas/raceSchemas';

const router = Router();

const raceController = container.get<RaceController>(TYPES.RaceController);

router.post('/accept', validate(acceptRaceSchema), (req, res) =>
  raceController.accept(req, res),
);

export default router;
