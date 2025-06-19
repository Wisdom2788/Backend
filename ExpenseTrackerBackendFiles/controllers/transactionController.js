const express = require('express');
const router = express.Router();
const TransactionService = require('../services/transactionService');
const TransactionResponse = require('../responses/transactionResponse');
const ApiError = require('../exceptions/apiError');

router.get('/', async (req, res, next) => {
    try {
        console.log('Fetching all transactions');
        const transactions = await TransactionService.getAllTransactions();
        console.log('Transactions fetched:', transactions.length);
        res.json(TransactionResponse.formatMultiple(transactions));
    } catch (error) {
        console.error('GET /api/transactions error:', error);
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        console.log('Received POST data:', req.body);
        const transaction = await TransactionService.addTransaction(req.body);
        console.log('Transaction added:', transaction);
        res.status(201).json({
            message: 'Transaction added successfully',
            transaction: TransactionResponse.formatSingle(transaction)
        });
    } catch (error) {
        console.error('POST /api/transactions error:', error);
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        console.log('Deleting transaction:', req.params.id);
        await TransactionService.deleteTransaction(req.params.id);
        console.log('Transaction deleted');
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('DELETE /api/transactions/:id error:', error);
        next(error);
    }
});

// Error handler middleware
router.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    console.error('Error handler:', error.message, error.stack);
    res.status(status).json({ error: error.message });
});

module.exports = router;