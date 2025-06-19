const Transaction = require('../models/transactionModel');

   class TransactionRepository {
       async getAll() {
           return await Transaction.find().sort({ createdAt: -1 });
       }

       async create(transactionData) {
           const transaction = new Transaction(transactionData);
           return await transaction.save();
       }

       async delete(id) {
           return await Transaction.findByIdAndDelete(id);
       }
   }

   module.exports = new TransactionRepository();