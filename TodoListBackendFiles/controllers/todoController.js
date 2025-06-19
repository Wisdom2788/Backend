const TodoService = require('../services/todoService');
const AppError = require('../exceptions/appError');

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

exports.getAllTodos = catchAsync(async (req, res, next) => {
  const filter = req.query.filter || 'all';
  const todos = await TodoService.getAllTodos(filter);
  res.status(200).json({
    status: 'success',
    data: todos,
  });
});

exports.createTodo = catchAsync(async (req, res, next) => {
  const todo = await TodoService.createTodo(req.body);
  res.status(201).json({
    status: 'success',
    data: todo,
  });
});

exports.toggleTodo = catchAsync(async (req, res, next) => {
  const todo = await TodoService.toggleTodo(req.params.id);
  res.status(200).json({
    status: 'success',
    data: todo,
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  await TodoService.deleteTodo(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.clearCompleted = catchAsync(async (req, res, next) => {
  await TodoService.clearCompleted();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};