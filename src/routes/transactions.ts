import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as store from '../store';
import { Transaction, CreateTransactionBody } from '../types';

const router = Router();

/**
 * @openapi
 * /transactions:
 *   post:
 *     summary: Add a transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransaction'
 *     responses:
 *       201:
 *         description: Transaction created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Validation error
 */
router.post('/', (req: Request<object, object, CreateTransactionBody>, res: Response) => {
  const { amount, type, category, description, date } = req.body;

  if (typeof amount !== 'number' || amount <= 0) {
    res.status(400).json({ error: 'amount must be a positive number' });
    return;
  }
  if (type !== 'income' && type !== 'expense') {
    res.status(400).json({ error: 'type must be "income" or "expense"' });
    return;
  }
  if (typeof category !== 'string' || category.trim() === '') {
    res.status(400).json({ error: 'category is required' });
    return;
  }

  const transaction: Transaction = {
    id: uuidv4(),
    amount,
    type,
    category: category.trim(),
    description: typeof description === 'string' ? description.trim() : undefined,
    date: typeof date === 'string' ? date : new Date().toISOString().split('T')[0],
  };

  store.add(transaction);
  res.status(201).json(transaction);
});

/**
 * @openapi
 * /transactions:
 *   get:
 *     summary: List all transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category (case-insensitive)
 *     responses:
 *       200:
 *         description: Array of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */
router.get('/', (req: Request, res: Response) => {
  const { category } = req.query;
  let result = store.getAll();

  if (typeof category === 'string' && category.trim() !== '') {
    const lower = category.toLowerCase();
    result = result.filter((t) => t.category.toLowerCase() === lower);
  }

  res.json(result);
});

/**
 * @openapi
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Transaction not found
 */
router.delete('/:id', (req: Request, res: Response) => {
  const removed = store.remove(req.params.id);
  if (!removed) {
    res.status(404).json({ error: 'Transaction not found' });
    return;
  }
  res.status(204).send();
});

export default router;
