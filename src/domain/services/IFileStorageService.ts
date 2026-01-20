export interface IFileStorageService {
  saveJson(filename: string, data: any): Promise<string>;
  readJson<T>(filename: string): Promise<T>;
  exists(filename: string): Promise<boolean>;
  listFiles(): Promise<string[]>;
}
