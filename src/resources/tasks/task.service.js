const { tasks } = require('../../hardcodedData');
const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const create = (boardId, task) => tasksRepo.create(boardId, task);

const update = (boardId, id, { title, order, description, userId, columnId }) =>
  tasksRepo.update(boardId, id, {
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });

const deleteById = (boardId, id) => {
  tasksRepo.deleteById(boardId, id);
};

const deleteByBoardId = boardId => {
  const ids = Object.keys(tasks).filter(key => tasks[key].boardId === boardId);
  ids.forEach(id => {
    delete tasks[id];
  });
};

const resetByUserId = userId => {
  const ids = Object.keys(tasks).filter(key => tasks[key].userId === userId);
  ids.forEach(id => {
    tasks[id].userId = null;
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  deleteByBoardId,
  resetByUserId
};
