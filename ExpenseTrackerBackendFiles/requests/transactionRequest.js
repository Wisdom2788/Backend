const ApiError = require('../exceptions/apiError');

   class TransactionRequest {
       static validate(transactionData) {
           if (!transactionData.description || typeof transactionData.description !== 'string' || transactionData.description.trim() === '') {
               throw new ApiError('Description is required and must be a non-empty string', 400);
           }
           if (!transactionData.amount || isNaN(transactionData.amount)) {
               throw new ApiError('Amount is required and must be a number', 400);
           }
       }
   }

   module.exports = TransactionRequest;