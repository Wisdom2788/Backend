const express = require('express');
const cors = require('cors');
const connectDB = require('./data/mongodb');
const todoController = require('./controllers/todoController');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../To-do Frontend')); // Serve frontend files

// Routes
app.get('/api/todos', todoController.getAllTodos);
app.post('/api/todos', todoController.createTodo);
app.patch('/api/todos/:id', todoController.toggleTodo);
app.delete('/api/todos/:id', todoController.deleteTodo);
app.delete('/api/todos/completed', todoController.clearCompleted);

// Error Handling
app.use(todoController.errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();