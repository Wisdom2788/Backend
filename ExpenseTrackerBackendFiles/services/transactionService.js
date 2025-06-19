const TransactionRepository = require('../repository/transactionRepository');
    const TransactionRequest = require('../requests/transactionRequest');

    class TransactionService {
        async getAllTransactions() {
            return await TransactionRepository.getAll();
        }

        async addTransaction(transactionData) {
            TransactionRequest.validate(transactionData);
            return await TransactionRepository.create(transactionData);
        }

        async deleteTransaction(id) {
            return await TransactionRepository.delete(id);
        }
    }

    module.exports = new TransactionService();