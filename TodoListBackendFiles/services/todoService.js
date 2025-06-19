const Todo = require('../models/todoModel');
const TodoRequest = require('../dtos/requests/todoRequest');
const { mapToResponse, mapToResponseArray } = require('../utils/mapper');
const AppError = require('../exceptions/appError');

class TodoService {
  async getAllTodos(filter) {
    let todos = await Todo.find().sort({ createdAt: -1 });
    if (filter === 'active') {
      todos = todos.filter((item) => !item.completed);
    } else if (filter === 'completed') {
      todos = todos.filter((item) => item.completed);
    }
    return mapToResponseArray(todos);
  }

  async createTodo(todoData) {
    const todoRequest = new TodoRequest(todoData.text);
    todoRequest.validate();
    const todo = new Todo({ text: todoData.text });
    await todo.save();
    return mapToResponse(todo);
  }

  async toggleTodo(id) {
    const todo = await Todo.findById(id);
    if (!todo) throw new AppError('Todo not found', 404);
    todo.completed = !todo.completed;
    await todo.save();
    return mapToResponse(todo);
  }

  async deleteTodo(id) {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) throw new AppError('Todo not found', 404);
    return { message: 'Todo deleted' };
  }

  async clearCompleted() {
    await Todo.deleteMany({ completed: true });
    return { message: 'Completed todos cleared' };
  }
}

module.exports = new TodoService();