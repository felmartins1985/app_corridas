export interface IQueueService {
  enqueue<T>(queueName: string, data: T): Promise<string>;
  process<T>(queueName: string, handler: (data: T) => Promise<void>): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
}
