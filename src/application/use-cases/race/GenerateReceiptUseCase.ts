import { injectable, inject } from 'inversify';
import { Receipt } from '@domain/value-objects/Receipt';
import { IFileStorageService } from '@domain/services/IFileStorageService';
import { TYPES } from '@shared/container/types';

interface GenerateReceiptRequest {
  raceId: string;
  passengerId: string;
  driverId: string;
  price: number;
  distanceMeters: number;
  date: Date;
}

@injectable()
export class GenerateReceiptUseCase {
  constructor(@inject(TYPES.FileStorageService) private fileStorageService: IFileStorageService) {}

  async execute(request: GenerateReceiptRequest): Promise<string> {
    const receipt = new Receipt(
      request.raceId,
      request.passengerId,
      request.driverId,
      request.date,
      request.price,
      request.distanceMeters,
    );

    const filename = `receipt-${request.raceId}`;
    const receiptPath = await this.fileStorageService.saveJson(
      filename,
      JSON.parse(receipt.toJSON()),
    );

    return receiptPath;
  }
}
