import { Router } from 'express';
import { container } from '@shared/container';
import { TYPES } from '@shared/container/types';
import { PassengerController } from '../controllers/PassengerController';
import { validate } from '../middlewares/validation';
import {
  createPassengerSchema,
  updatePassengerSchema,
  getPassengerSchema,
  deletePassengerSchema,
} from '../schemas/passengerSchemas';

const router = Router();

const passengerController = container.get<PassengerController>(TYPES.PassengerController);

router.post('/', validate(createPassengerSchema), (req, res) =>
  passengerController.create(req, res),
);

router.get('/', (req, res) => passengerController.getAll(req, res));

router.get('/:id', validate(getPassengerSchema), (req, res) =>
  passengerController.getById(req, res),
);

router.put('/:id', validate(updatePassengerSchema), (req, res) =>
  passengerController.update(req, res),
);

router.delete('/:id', validate(deletePassengerSchema), (req, res) =>
  passengerController.delete(req, res),
);

export default router;
