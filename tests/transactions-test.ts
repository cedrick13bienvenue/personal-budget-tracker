import request from 'supertest';
import app from '../src/app';
import * as store from '../src/store';

beforeEach(() => store.reset());

describe('POST /transactions', () => {
  it('creates a transaction and returns 201', async () => {
    const res = await request(app).post('/transactions').send({
      amount: 100,
      type: 'income',
      category: 'salary',
      date: '2026-05-12',
    });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ amount: 100, type: 'income', category: 'salary' });
    expect(res.body.id).toBeDefined();
  });

  it('returns 400 for missing amount', async () => {
    const res = await request(app).post('/transactions').send({ type: 'income', category: 'food' });
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid type', async () => {
    const res = await request(app).post('/transactions').send({ amount: 50, type: 'gift', category: 'food' });
    expect(res.status).toBe(400);
  });

  it('returns 400 for missing category', async () => {
    const res = await request(app).post('/transactions').send({ amount: 50, type: 'expense' });
    expect(res.status).toBe(400);
  });

  it('returns 400 for zero amount', async () => {
    const res = await request(app).post('/transactions').send({ amount: 0, type: 'income', category: 'food' });
    expect(res.status).toBe(400);
  });
});

describe('GET /transactions', () => {
  it('returns empty array when no transactions', async () => {
    const res = await request(app).get('/transactions');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns all transactions', async () => {
    await request(app).post('/transactions').send({ amount: 200, type: 'income', category: 'salary' });
    await request(app).post('/transactions').send({ amount: 30, type: 'expense', category: 'food' });
    const res = await request(app).get('/transactions');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('filters by category (case-insensitive)', async () => {
    await request(app).post('/transactions').send({ amount: 30, type: 'expense', category: 'Food' });
    await request(app).post('/transactions').send({ amount: 50, type: 'expense', category: 'transport' });
    const res = await request(app).get('/transactions?category=food');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].category).toBe('Food');
  });
});

describe('DELETE /transactions/:id', () => {
  it('deletes an existing transaction and returns 204', async () => {
    const post = await request(app).post('/transactions').send({ amount: 10, type: 'expense', category: 'coffee' });
    const { id } = post.body;
    const del = await request(app).delete(`/transactions/${id}`);
    expect(del.status).toBe(204);
    const list = await request(app).get('/transactions');
    expect(list.body).toHaveLength(0);
  });

  it('returns 404 for unknown id', async () => {
    const res = await request(app).delete('/transactions/nonexistent-id');
    expect(res.status).toBe(404);
  });
});
