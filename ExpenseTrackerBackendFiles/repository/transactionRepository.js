const Transaction = require('../models/transactionModel');

class TransactionRepository {
    static async findAll(userId) {
        return await Transaction.find({ userId }).sort({ createdAt: -1 });
    }

    static async create(data) {
        return await Transaction.create(data);
    }

    static async deleteById(id, userId) {
        return await Transaction.findOneAndDelete({ _id: id, userId });
    }
}

module.exports = TransactionRepository;