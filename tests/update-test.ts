import request from 'supertest';
import app from '../src/app';
import * as store from '../src/store';

beforeEach(() => store.reset());

describe('PUT /transactions/:id', () => {
  it('updates a transaction and returns 200 with updated data', async () => {
    const post = await request(app).post('/transactions').send({
      amount: 50,
      type: 'expense',
      category: 'food',
    });
    const { id } = post.body;

    const res = await request(app).put(`/transactions/${id}`).send({ amount: 75, category: 'dining' });
    expect(res.status).toBe(200);
    expect(res.body.amount).toBe(75);
    expect(res.body.category).toBe('dining');
    expect(res.body.type).toBe('expense');
    expect(res.body.id).toBe(id);
  });

  it('returns 404 for unknown id', async () => {
    const res = await request(app).put('/transactions/nonexistent').send({ amount: 10 });
    expect(res.status).toBe(404);
  });

  it('returns 400 for invalid amount', async () => {
    const post = await request(app).post('/transactions').send({ amount: 50, type: 'expense', category: 'food' });
    const res = await request(app).put(`/transactions/${post.body.id}`).send({ amount: -5 });
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid type', async () => {
    const post = await request(app).post('/transactions').send({ amount: 50, type: 'expense', category: 'food' });
    const res = await request(app).put(`/transactions/${post.body.id}`).send({ type: 'gift' });
    expect(res.status).toBe(400);
  });

  it('enforces validation and keeps existing fields when not provided', async () => {
    const post = await request(app).post('/transactions').send({
      amount: 100,
      type: 'income',
      category: 'salary',
      date: '2026-05-01',
    });
    const { id } = post.body;

    const res = await request(app).put(`/transactions/${id}`).send({ description: 'Monthly pay' });
    expect(res.status).toBe(200);
    expect(res.body.amount).toBe(100);
    expect(res.body.type).toBe('income');
    expect(res.body.description).toBe('Monthly pay');
  });
});
