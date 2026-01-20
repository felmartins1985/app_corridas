import { Router } from 'express';
import driverRoutes from './driverRoutes';
import passengerRoutes from './passengerRoutes';
import fareRoutes from './fareRoutes';
import raceRoutes from './raceRoutes';

const router = Router();

router.use('/drivers', driverRoutes);
router.use('/passengers', passengerRoutes);
router.use('/fares', fareRoutes);
router.use('/races', raceRoutes);

export default router;
