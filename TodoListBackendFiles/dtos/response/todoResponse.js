class TodoResponse {
  constructor(todo) {
    this.id = todo._id;
    this.text = todo.text;
    this.completed = todo.completed;
    this.createdAt = todo.createdAt;
  }
}

module.exports = TodoResponse;