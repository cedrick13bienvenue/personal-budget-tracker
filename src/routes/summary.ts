import { Router, Request, Response } from 'express';
import * as store from '../store';

const router = Router();

/**
 * @openapi
 * /summary:
 *   get:
 *     summary: View budget summary
 *     tags: [Summary]
 *     responses:
 *       200:
 *         description: Total income, expenses, and net balance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Summary'
 */
router.get('/', (_req: Request, res: Response) => {
  const transactions = store.getAll();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  res.json({
    totalIncome: parseFloat(totalIncome.toFixed(2)),
    totalExpenses: parseFloat(totalExpenses.toFixed(2)),
    netBalance: parseFloat((totalIncome - totalExpenses).toFixed(2)),
  });
});

export default router;
