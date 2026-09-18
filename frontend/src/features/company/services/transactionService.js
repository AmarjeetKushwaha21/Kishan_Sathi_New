import initialTransactions from '../data/transactions.json';

export const transactionService = {
  async getTransactions() {
    return new Promise((resolve) => setTimeout(() => resolve([...initialTransactions]), 50));
  },
};

export default transactionService;
