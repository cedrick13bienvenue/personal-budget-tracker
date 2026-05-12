import request from 'supertest';
import app from '../src/app';
import * as store from '../src/store';

beforeEach(() => store.reset());

describe('GET /summary', () => {
  it('returns zeros when no transactions exist', async () => {
    const res = await request(app).get('/summary');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ totalIncome: 0, totalExpenses: 0, netBalance: 0 });
  });

  it('calculates totals correctly', async () => {
    await request(app).post('/transactions').send({ amount: 1000, type: 'income', category: 'salary' });
    await request(app).post('/transactions').send({ amount: 200, type: 'expense', category: 'rent' });
    await request(app).post('/transactions').send({ amount: 50, type: 'expense', category: 'food' });

    const res = await request(app).get('/summary');
    expect(res.status).toBe(200);
    expect(res.body.totalIncome).toBe(1000);
    expect(res.body.totalExpenses).toBe(250);
    expect(res.body.netBalance).toBe(750);
  });

  it('handles income-only scenario', async () => {
    await request(app).post('/transactions').send({ amount: 500, type: 'income', category: 'freelance' });
    const res = await request(app).get('/summary');
    expect(res.body.totalExpenses).toBe(0);
    expect(res.body.netBalance).toBe(500);
  });

  it('handles negative net balance', async () => {
    await request(app).post('/transactions').send({ amount: 100, type: 'income', category: 'salary' });
    await request(app).post('/transactions').send({ amount: 300, type: 'expense', category: 'rent' });
    const res = await request(app).get('/summary');
    expect(res.body.netBalance).toBe(-200);
  });
});
