const TransactionRepository = require('../repository/transactionRepository');
const TransactionResponse = require('../responses/transactionResponse');
const ApiError = require('../utils/apiError');

class TransactionService {
    static async getAll(userId) {
        const transactions = await TransactionRepository.findAll(userId);
        return TransactionResponse.formatMultiple(transactions);
    }

    static async create(data, userId) {
        if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
            throw new ApiError('Description is required and must be a non-empty string', 400);
        }
        if (typeof data.amount !== 'number' || isNaN(data.amount)) {
            throw new ApiError('Amount is required and must be a valid number', 400);
        }
        const transactionData = { ...data, userId };
        const transaction = await TransactionRepository.create(transactionData);
        return TransactionResponse.formatSingle(transaction);
    }

    static async delete(id, userId) {
        const transaction = await TransactionRepository.deleteById(id, userId);
        if (!transaction) {
            throw new ApiError('Transaction not found or unauthorized', 404);
        }
        return { message: 'Transaction deleted successfully' };
    }
}

module.exports = TransactionService;