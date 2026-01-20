import { IFileStorageService } from '@domain/services/IFileStorageService';
import { promises as fs } from 'fs';
import * as path from 'path';

export class LocalFileStorageService implements IFileStorageService {
  private readonly storageDir: string;

  constructor(storageDir: string = './storage') {
    this.storageDir = storageDir;
  }

  async saveJson<T>(filename: string, data: T): Promise<string> {
    await this.ensureDirectoryExists();

    const filePath = path.join(this.storageDir, `${filename}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return filePath;
  }

  async readJson<T>(filename: string): Promise<T> {
    const filePath = path.join(this.storageDir, `${filename}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  }

  async exists(filename: string): Promise<boolean> {
    const filePath = path.join(this.storageDir, `${filename}.json`);
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

  private async ensureDirectoryExists(): Promise<void> {
    try {
      await fs.access(this.storageDir);
    } catch {
      await fs.mkdir(this.storageDir, { recursive: true });
    }
  }
}
