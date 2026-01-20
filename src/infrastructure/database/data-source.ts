import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { DriverSchema } from './schemas/DriverSchema';
import { FareRequestSchema } from './schemas/FareRequestSchema';
import { PassengerSchema } from './schemas/PassengerSchema';
import { RaceSchema } from './schemas/RaceSchema';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'arkmeds',
  password: process.env.DB_PASSWORD || 'arkmeds123',
  database: process.env.DB_DATABASE || 'arkmeds_db',
  synchronize: true,
  logging: ['schema', 'error', 'warn'],
  schema: 'public',
  entities: [DriverSchema, PassengerSchema, RaceSchema, FareRequestSchema],
});
