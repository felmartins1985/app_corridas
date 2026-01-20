import { IQueueService } from '@domain/services/IQueueService';

export interface ReceiptJobData {
  raceId: string;
  passengerId: string;
  driverId: string;
  price: number;
  distanceMeters: number;
  date: Date;
}

export class ReceiptQueueService {
  private readonly QUEUE_NAME = 'generate-receipt';

  constructor(private queueService: IQueueService) {}

  async enqueueReceiptGeneration(data: ReceiptJobData): Promise<string> {
    console.log(`📤 Enqueuing receipt generation for race ${data.raceId}...`);
    const jobId = await this.queueService.enqueue(this.QUEUE_NAME, data);
    console.log(`✅ Receipt job enqueued with ID: ${jobId}`);
    return jobId;
  }

  async processReceipts(handler: (data: ReceiptJobData) => Promise<void>): Promise<void> {
    await this.queueService.process(this.QUEUE_NAME, handler);
  }

  async start(): Promise<void> {
    await this.queueService.start();
  }

  async stop(): Promise<void> {
    await this.queueService.stop();
  }
}
