import { injectable } from 'inversify';
import { promises as fs } from 'fs';
import path from 'path';
import { IFileStorageService } from '@domain/services/IFileStorageService';

@injectable()
export class FileStorageService implements IFileStorageService {
  private readonly storageDir: string;

  constructor(storageDir: string = './storage/receipts') {
    this.storageDir = path.resolve(storageDir);
  }

  async saveJson(filename: string, data: any): Promise<string> {
    await this.ensureDirectoryExists();

    const filePath = this.getFilePath(filename);
    const jsonContent = JSON.stringify(data, null, 2);

    await fs.writeFile(filePath, jsonContent, 'utf-8');

    return filePath;
  }

  async readJson<T>(filename: string): Promise<T> {
    const filePath = this.getFilePath(filename);

    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  }

  async exists(filename: string): Promise<boolean> {
    const filePath = this.getFilePath(filename);

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async listFiles(): Promise<string[]> {
    await this.ensureDirectoryExists();

    const files = await fs.readdir(this.storageDir);
    return files.filter((file) => file.endsWith('.json'));
  }

  private getFilePath(filename: string): string {
    const cleanFilename = filename.endsWith('.json') ? filename : `${filename}.json`;

    return path.join(this.storageDir, cleanFilename);
  }

  private async ensureDirectoryExists(): Promise<void> {
    try {
      await fs.access(this.storageDir);
    } catch {
      await fs.mkdir(this.storageDir, { recursive: true });
    }
  }
}
