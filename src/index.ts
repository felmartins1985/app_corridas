import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './infrastructure/database/data-source';
import { container } from './shared/container';
import { TYPES } from './shared/container/types';
import routes from './presentation/routes';
import { ReceiptWorker } from './infrastructure/workers/ReceiptWorker';
import { requestLogger } from './presentation/middlewares/logger';
import { errorHandler } from './presentation/middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(requestLogger);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


app.use('/api', routes);

app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    console.log('✅ Database connected successfully');
    
    try {
      const receiptWorker = container.get<ReceiptWorker>(TYPES.ReceiptWorker);
      console.log('📦 ReceiptWorker instance:', receiptWorker.constructor.name);
      await receiptWorker.start();
      console.log('🔄 Receipt Worker started from index.ts');
    } catch (error) {
      console.error('❌ Error starting receipt worker:', error);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to database:', error);
    process.exit(1);
  });

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  const receiptWorker = container.get<ReceiptWorker>(TYPES.ReceiptQueueService);
  await receiptWorker.stop();
  await AppDataSource.destroy();
  process.exit(0);
});

export default app;
