export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description?: string;
  date: string;
}

export interface CreateTransactionBody {
  amount: unknown;
  type: unknown;
  category: unknown;
  description?: unknown;
  date?: unknown;
}
