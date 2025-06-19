const { mapToDto } = require('../utils/mapper');
const TransactionDto = require('../dtos/transactionDto');

class TransactionResponse {
    static formatSingle(transaction) {
        return mapToDto(transaction, TransactionDto);
    }

    static formatMultiple(transactions) {
        return transactions.map(transaction => mapToDto(transaction, TransactionDto));
    }
}

module.exports = TransactionResponse;