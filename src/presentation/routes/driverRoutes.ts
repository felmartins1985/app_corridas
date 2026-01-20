import { Router } from 'express';
import { container } from '@shared/container';
import { TYPES } from '@shared/container/types';
import { DriverController } from '../controllers/DriverController';
import { validate } from '../middlewares/validation';
import {
  createDriverSchema,
  updateDriverSchema,
  getDriverSchema,
  deleteDriverSchema,
} from '../schemas/driverSchemas';

const router = Router();

const driverController = container.get<DriverController>(TYPES.DriverController);

router.post('/', validate(createDriverSchema), (req, res) =>
  driverController.create(req, res),
);

router.get('/', (req, res) => driverController.getAll(req, res));

router.get('/:id', validate(getDriverSchema), (req, res) =>
  driverController.getById(req, res),
);

router.put('/:id', validate(updateDriverSchema), (req, res) =>
  driverController.update(req, res),
);

router.delete('/:id', validate(deleteDriverSchema), (req, res) =>
  driverController.delete(req, res),
);

export default router;
