class TransactionDto {
       constructor(transaction) {
           this.id = transaction._id;
           this.description = transaction.description;
           this.amount = transaction.amount;
           this.createdAt = transaction.createdAt;
       }
   }

   module.exports = TransactionDto;