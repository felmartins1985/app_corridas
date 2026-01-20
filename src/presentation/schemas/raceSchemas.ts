import { z } from 'zod';

export const acceptRaceSchema = z.object({
  body: z.object({
    driverId: z.string().uuid('Invalid driver ID format'),
    passengerId: z.string().uuid('Invalid passenger ID format'),
    originLat: z
      .number()
      .min(-90, 'Latitude must be between -90 and 90')
      .max(90, 'Latitude must be between -90 and 90'),
    originLng: z
      .number()
      .min(-180, 'Longitude must be between -180 and 180')
      .max(180, 'Longitude must be between -180 and 180'),
    destinationLat: z
      .number()
      .min(-90, 'Latitude must be between -90 and 90')
      .max(90, 'Latitude must be between -90 and 90'),
    destinationLng: z
      .number()
      .min(-180, 'Longitude must be between -180 and 180')
      .max(180, 'Longitude must be between -180 and 180'),
    startDate: z.string().datetime('Invalid date format'),
  }),
});
