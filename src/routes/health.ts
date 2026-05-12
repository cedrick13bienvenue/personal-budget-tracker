import { Router, Request, Response } from 'express';

const router = Router();

const startTime = Date.now();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 uptime:
 *                   type: number
 *                   description: Uptime in seconds
 *                 timestamp:
 *                   type: string
 *                   description: Current server time (ISO 8601)
 *                 memoryMB:
 *                   type: number
 *                   description: Heap memory used in MB
 */
router.get('/', (_req: Request, res: Response) => {
  const memMB = parseFloat((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2));
  res.json({
    status: 'ok',
    uptime: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
    memoryMB: memMB,
  });
});

export default router;
