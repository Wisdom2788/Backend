const TransactionDto = require('../dtos/transactionDto');

class TransactionResponse {
    static formatSingle(transaction) {
        return new TransactionDto(transaction);
    }

    static formatMultiple(transactions) {
        return transactions.map(transaction => new TransactionDto(transaction));
    }
}

module.exports = TransactionResponse;
