import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';

// Repositories
import { IDriverRepository } from '@domain/repositories/IDriverRepository';
import { IPassengerRepository } from '@domain/repositories/IPassengerRepository';
import { IRaceRepository } from '@domain/repositories/IRaceRepository';
import { IFareRequestRepository } from '@domain/repositories/IFareRequestRepository';
import { DriverRepository } from '@infrastructure/database/repositories/DriverRepository';
import { PassengerRepository } from '@infrastructure/database/repositories/PassengerRepository';
import { RaceRepository } from '@infrastructure/database/repositories/RaceRepository';
import { FareRequestRepository } from '@infrastructure/database/repositories/FareRequestRepository';

// Services
import { IFileStorageService } from '@domain/services/IFileStorageService';
import { IGeoLocationService } from '@domain/services/IGeoLocationService';
import { IDateTimeService } from '@domain/services/IDateTimeService';
import { IQueueService } from '@domain/services/IQueueService';
import { LocalFileStorageService } from '@infrastructure/services/LocalFileStorageService';
import { GeoLocationService } from '@infrastructure/services/GeoLocationService';
import { DateTimeService } from '@infrastructure/services/DateTimeService';
import { PgBossQueueService } from '@infrastructure/services/PgBossQueueService';
import { ReceiptQueueService } from '@infrastructure/services/ReceiptQueueService';
import { FareCalculator } from '@domain/services/FareCalculator';
import { ReceiptWorker } from '@infrastructure/workers/ReceiptWorker';

// Use Cases
import { CreateDriverUseCase } from '@application/use-cases/driver/CreateDriverUseCase';
import { GetDriverUseCase } from '@application/use-cases/driver/GetDriverUseCase';
import { GetAllDriversUseCase } from '@application/use-cases/driver/GetAllDriversUseCase';
import { UpdateDriverUseCase } from '@application/use-cases/driver/UpdateDriverUseCase';
import { DeleteDriverUseCase } from '@application/use-cases/driver/DeleteDriverUseCase';
import { CreatePassengerUseCase } from '@application/use-cases/passenger/CreatePassengerUseCase';
import { GetPassengerUseCase } from '@application/use-cases/passenger/GetPassengerUseCase';
import { GetAllPassengersUseCase } from '@application/use-cases/passenger/GetAllPassengersUseCase';
import { UpdatePassengerUseCase } from '@application/use-cases/passenger/UpdatePassengerUseCase';
import { DeletePassengerUseCase } from '@application/use-cases/passenger/DeletePassengerUseCase';
import { CalculateFareUseCase } from '@application/use-cases/fare/CalculateFareUseCase';
import { AcceptRaceUseCase } from '@application/use-cases/race/AcceptRaceUseCase';
import { GenerateReceiptUseCase } from '@application/use-cases/race/GenerateReceiptUseCase';

// Controllers
import { DriverController } from '@presentation/controllers/DriverController';
import { PassengerController } from '@presentation/controllers/PassengerController';
import { FareController } from '@presentation/controllers/FareController';
import { RaceController } from '@presentation/controllers/RaceController';

const container = new Container();

// Repositories
container.bind<IDriverRepository>(TYPES.DriverRepository).to(DriverRepository);
container.bind<IPassengerRepository>(TYPES.PassengerRepository).to(PassengerRepository);
container.bind<IRaceRepository>(TYPES.RaceRepository).to(RaceRepository);
container.bind<IFareRequestRepository>(TYPES.FareRequestRepository).to(FareRequestRepository);

// Services - External
container
  .bind<IFileStorageService>(TYPES.FileStorageService)
  .toDynamicValue(() => new LocalFileStorageService('./storage'))
  .inSingletonScope();

container
  .bind<IGeoLocationService>(TYPES.GeoLocationService)
  .to(GeoLocationService)
  .inSingletonScope();

container.bind<IDateTimeService>(TYPES.DateTimeService).to(DateTimeService).inSingletonScope();

// Services - Queue
const queueConnectionString =
  process.env.QUEUE_CONNECTION_STRING ||
  'postgresql://arkmeds:arkmeds123@localhost:5432/arkmeds_db';

container
  .bind<IQueueService>(TYPES.QueueService)
  .toDynamicValue(() => new PgBossQueueService(queueConnectionString))
  .inSingletonScope();

container
  .bind<ReceiptQueueService>(TYPES.ReceiptQueueService)
  .toDynamicValue((context) => {
    const queueService = context.container.get<IQueueService>(TYPES.QueueService);
    return new ReceiptQueueService(queueService);
  })
  .inSingletonScope();

// Worker
container
  .bind<ReceiptWorker>(TYPES.ReceiptWorker)
  .toDynamicValue((context) => {
    const receiptQueueService = context.container.get<ReceiptQueueService>(
      TYPES.ReceiptQueueService,
    );
    const generateReceiptUseCase = context.container.get<GenerateReceiptUseCase>(
      TYPES.GenerateReceiptUseCase,
    );
    return new ReceiptWorker(receiptQueueService, generateReceiptUseCase);
  })
  .inSingletonScope();

// Services - Domain
container.bind<FareCalculator>(TYPES.FareCalculatorService).to(FareCalculator).inSingletonScope();

// Use Cases - Driver
container.bind<CreateDriverUseCase>(TYPES.CreateDriverUseCase).to(CreateDriverUseCase);
container.bind<GetDriverUseCase>(TYPES.GetDriverUseCase).to(GetDriverUseCase);
container.bind<GetAllDriversUseCase>(TYPES.GetAllDriversUseCase).to(GetAllDriversUseCase);
container.bind<UpdateDriverUseCase>(TYPES.UpdateDriverUseCase).to(UpdateDriverUseCase);
container.bind<DeleteDriverUseCase>(TYPES.DeleteDriverUseCase).to(DeleteDriverUseCase);

// Use Cases - Passenger
container.bind<CreatePassengerUseCase>(TYPES.CreatePassengerUseCase).to(CreatePassengerUseCase);
container.bind<GetPassengerUseCase>(TYPES.GetPassengerUseCase).to(GetPassengerUseCase);
container.bind<GetAllPassengersUseCase>(TYPES.GetAllPassengersUseCase).to(GetAllPassengersUseCase);
container.bind<UpdatePassengerUseCase>(TYPES.UpdatePassengerUseCase).to(UpdatePassengerUseCase);
container.bind<DeletePassengerUseCase>(TYPES.DeletePassengerUseCase).to(DeletePassengerUseCase);

// Use Cases - Fare
container.bind<CalculateFareUseCase>(TYPES.CalculateFareUseCase).to(CalculateFareUseCase);

// Use Cases - Race
container.bind<AcceptRaceUseCase>(TYPES.AcceptRaceUseCase).to(AcceptRaceUseCase);
container.bind<GenerateReceiptUseCase>(TYPES.GenerateReceiptUseCase).to(GenerateReceiptUseCase);

// Controllers
container.bind<DriverController>(TYPES.DriverController).to(DriverController);
container.bind<PassengerController>(TYPES.PassengerController).to(PassengerController);
container.bind<FareController>(TYPES.FareController).to(FareController);
container.bind<RaceController>(TYPES.RaceController).to(RaceController);

export { container };
