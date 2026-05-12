import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { requestLogger } from './middleware/logger';
import transactionsRouter from './routes/transactions';
import healthRouter from './routes/health';
import summaryRouter from './routes/summary';

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/transactions', transactionsRouter);
app.use('/health', healthRouter);
app.use('/summary', summaryRouter);

export default app;
