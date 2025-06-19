const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const transactionController = require('./controllers/transactionController');
const authController = require('./controllers/authController');

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(express.json());

app.use('/api/transactions', transactionController);
app.use('/api/auth', authController);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    console.error('Global error:', error.message, error.stack);
    res.status(status).json({ error: error.message });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message, err.stack);
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message, err.stack);
});