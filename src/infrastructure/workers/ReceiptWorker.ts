import { ReceiptQueueService, ReceiptJobData } from '@infrastructure/services/ReceiptQueueService';
import { GenerateReceiptUseCase } from '@application/use-cases/race/GenerateReceiptUseCase';

export class ReceiptWorker {
  constructor(
    private receiptQueueService: ReceiptQueueService,
    private generateReceiptUseCase: GenerateReceiptUseCase,
  ) {}

  async start(): Promise<void> {
    await this.receiptQueueService.start();

    await this.receiptQueueService.processReceipts(async (data: ReceiptJobData) => {
      try {
        console.log(`📄 Processing receipt for race ${data.raceId}...`);

        await this.generateReceiptUseCase.execute({
          raceId: data.raceId,
          passengerId: data.passengerId,
          driverId: data.driverId,
          price: data.price,
          distanceMeters: data.distanceMeters,
          date: new Date(data.date),
        });
      } catch (error) {
        throw error;
      }
    });

    console.log('✅ Receipt worker started');
  }

  async stop(): Promise<void> {
    await this.receiptQueueService.stop();
    console.log('⏹️  Receipt worker stopped');
  }
}
