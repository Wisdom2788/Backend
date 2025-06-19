const Todo = require('../models/todoModel');

   class TodoRepository {
     async getAll() {
       return await Todo.find().sort({ createdAt: -1 });
     }

     async getById(id) {
       return await Todo.findById(id);
     }

     async create(todoData) {
       const todo = new Todo(todoData);
       return await todo.save();
     }

     async update(id, updateData) {
       return await Todo.findByIdAndUpdate(id, updateData, { new: true });
     }

     async delete(id) {
       return await Todo.findByIdAndDelete(id);
     }

     async deleteCompleted() {
       return await Todo.deleteMany({ completed: true });
     }
   }

   module.exports = new TodoRepository();