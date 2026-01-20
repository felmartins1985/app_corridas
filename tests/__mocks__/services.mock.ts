import { IFileStorageService } from '@domain/services/IFileStorageService';
import { IGeoLocationService } from '@domain/services/IGeoLocationService';
import { IDateTimeService } from '@domain/services/IDateTimeService';
import { IQueueService } from '@domain/services/IQueueService';
import { FareCalculator } from '@domain/services/FareCalculator';
import { ReceiptQueueService } from '@infrastructure/services/ReceiptQueueService';

export const mockFileStorageService: jest.Mocked<IFileStorageService> = {
  saveJson: jest.fn().mockResolvedValue('./storage/test-file.json'),
  readJson: jest.fn(),
  exists: jest.fn(),
  listFiles: jest.fn(),
};

export const mockGeoLocationService: jest.Mocked<IGeoLocationService> = {
  calculateDistance: jest.fn(),
  isWithinBounds: jest.fn(),
};

export const mockDateTimeService: jest.Mocked<IDateTimeService> = {
  now: jest.fn().mockReturnValue(new Date('2024-01-01T10:00:00')),
  isWeekend: jest.fn(),
  getPeriodOfDay: jest.fn(),
  toISOString: jest.fn(),
  format: jest.fn(),
  addDays: jest.fn(),
  addHours: jest.fn(),
  differenceInDays: jest.fn(),
  differenceInHours: jest.fn(),
};

export const mockQueueService: jest.Mocked<IQueueService> = {
  start: jest.fn(),
  stop: jest.fn(),
  enqueue: jest.fn().mockResolvedValue('job-id-123'),
  process: jest.fn(),
};

export const mockReceiptQueueService: jest.Mocked<ReceiptQueueService> = {
  enqueueReceiptGeneration: jest.fn().mockResolvedValue('job-id-123'),
  processReceipts: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
} as any;

export const createMockFareCalculator = (): jest.Mocked<FareCalculator> => ({
  calculate: jest.fn().mockReturnValue(15.50),
} as any);
