import { IQueueService } from '@domain/services/IQueueService';

export class PgBossQueueService implements IQueueService {
  private boss: any;

  constructor(connectionString: string) {
    const PgBossModule = require('pg-boss');
    const PgBossClass = PgBossModule.PgBoss;
    this.boss = new PgBossClass(connectionString, {
      schema: 'pgboss',
      noSupervisor: false,
      noScheduling: false,
    });
  }

  async start(): Promise<void> {
    await this.boss.start();
    console.log('✅ Queue service started');
  }

  async stop(): Promise<void> {
    await this.boss.stop();
    console.log('⏹️  Queue service stopped');
  }

  async enqueue<T>(queueName: string, data: T): Promise<string> {
    if (!this.boss) {
      throw new Error('Queue service not started');
    }
    const jobId = await this.boss.send(queueName, data, {
      retryLimit: 3,
      retryDelay: 60,
      expireInSeconds: 60 * 15,
    });
    if (!jobId) {
      throw new Error('Failed to enqueue job');
    }
    return jobId;
  }

  async process<T>(queueName: string, handler: (data: T) => Promise<void>): Promise<void> {
    if (!this.boss) {
      throw new Error('Queue service not started');
    }
    await this.boss.createQueue(queueName);
    await this.boss.work(
      queueName,
      {
        newJobCheckInterval: 1000,
        teamSize: 1,
        teamConcurrency: 1,
      },
      async (jobs: any) => {
        const jobArray = Array.isArray(jobs) ? jobs : [jobs];
        for (const job of jobArray) {
          console.log(`🔍 Worker processing job ${job.id} from queue "${queueName}"`);
          await handler(job.data as T);
        }
      },
    );
  }
}
