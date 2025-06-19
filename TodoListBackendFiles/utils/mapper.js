const TodoResponse = require('../dtos/response/todoResponse');

const mapToResponse = (todo) => new TodoResponse(todo);
const mapToResponseArray = (todos) => todos.map((todo) => new TodoResponse(todo));

module.exports = { mapToResponse, mapToResponseArray };