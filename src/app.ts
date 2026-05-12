import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import transactionsRouter from './routes/transactions';
import healthRouter from './routes/health';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/transactions', transactionsRouter);
app.use('/health', healthRouter);

export default app;
