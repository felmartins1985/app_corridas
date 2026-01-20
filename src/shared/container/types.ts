export const TYPES = {
  // Repositories
  DriverRepository: Symbol.for('DriverRepository'),
  PassengerRepository: Symbol.for('PassengerRepository'),
  RaceRepository: Symbol.for('RaceRepository'),
  FareRequestRepository: Symbol.for('FareRequestRepository'),

  // Use Cases - Driver
  CreateDriverUseCase: Symbol.for('CreateDriverUseCase'),
  GetDriverUseCase: Symbol.for('GetDriverUseCase'),
  GetAllDriversUseCase: Symbol.for('GetAllDriversUseCase'),
  UpdateDriverUseCase: Symbol.for('UpdateDriverUseCase'),
  DeleteDriverUseCase: Symbol.for('DeleteDriverUseCase'),

  // Use Cases - Passenger
  CreatePassengerUseCase: Symbol.for('CreatePassengerUseCase'),
  GetPassengerUseCase: Symbol.for('GetPassengerUseCase'),
  GetAllPassengersUseCase: Symbol.for('GetAllPassengersUseCase'),
  UpdatePassengerUseCase: Symbol.for('UpdatePassengerUseCase'),
  DeletePassengerUseCase: Symbol.for('DeletePassengerUseCase'),

  // Use Cases - Fare
  CalculateFareUseCase: Symbol.for('CalculateFareUseCase'),

  // Use Cases - Race
  AcceptRaceUseCase: Symbol.for('AcceptRaceUseCase'),
  GenerateReceiptUseCase: Symbol.for('GenerateReceiptUseCase'),

  // Services - External
  FileStorageService: Symbol.for('FileStorageService'),
  GeoLocationService: Symbol.for('GeoLocationService'),
  DateTimeService: Symbol.for('DateTimeService'),

  // Services - Queue
  QueueService: Symbol.for('QueueService'),
  ReceiptQueueService: Symbol.for('ReceiptQueueService'),
  ReceiptWorker: Symbol.for('ReceiptWorker'),

  // Services - Domain
  FareCalculatorService: Symbol.for('FareCalculatorService'),

  // Controllers
  DriverController: Symbol.for('DriverController'),
  PassengerController: Symbol.for('PassengerController'),
  FareController: Symbol.for('FareController'),
  RaceController: Symbol.for('RaceController'),
};
