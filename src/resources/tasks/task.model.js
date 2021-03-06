const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskScheme = new Schema({
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String
});

const Task = mongoose.model('Task', taskScheme);

Task.toResponse = task => {
  const {
    _id: id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  } = task;
  return {
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  };
};

module.exports = Task;
