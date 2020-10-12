const uuid = require('uuid');
const Task = require('./task.model');
const { tasks } = require('../../hardcodedData');

const getAll = async boardId => {
  return Object.keys(tasks)
    .filter(key => tasks[key].boardId === boardId)
    .map(key => tasks[key]);
};

const getById = async (boardId, taskId) => {
  return Object.keys(tasks)
    .filter(key => tasks[key].boardId === boardId && tasks[key].id === taskId)
    .map(key => tasks[key])[0];
};

const create = async (boardId, { id = uuid(), title, order, description }) => {
  tasks[id] = new Task({ id, title, order, description, boardId });
  return tasks[id];
};

const update = async (
  boardId,
  id,
  { title, order, description, userId, columnId }
) => {
  tasks[id] = new Task({
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  return tasks[id];
};

const deleteById = async (boardId, id) => {
  delete tasks[id];
};

module.exports = { getAll, getById, create, update, deleteById };
