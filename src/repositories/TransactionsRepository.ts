import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reducer = (
      accumulator: Balance,
      currentValue: Transaction,
    ): Balance => {
      accumulator[currentValue.type] += currentValue.value;
      if (currentValue.type === 'outcome') {
        accumulator.total -= currentValue.value;
      }
      if (currentValue.type === 'income') {
        accumulator.total += currentValue.value;
      }
      return accumulator;
    };

    const balance: Balance = this.transactions.reduce(reducer, {
      income: 0,
      outcome: 0,
      total: 0,
    });

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
