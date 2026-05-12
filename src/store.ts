import { Transaction } from './types';

let transactions: Transaction[] = [];

export const getAll = (): Transaction[] => transactions;

export const add = (t: Transaction): void => {
  transactions.push(t);
};

export const remove = (id: string): boolean => {
  const before = transactions.length;
  transactions = transactions.filter((t) => t.id !== id);
  return transactions.length < before;
};

export const update = (id: string, patch: Partial<Omit<Transaction, 'id'>>): Transaction | null => {
  const idx = transactions.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  transactions[idx] = { ...transactions[idx], ...patch };
  return transactions[idx];
};

export const reset = (): void => {
  transactions = [];
};
