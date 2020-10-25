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

const deleteById = async (boardId, id) => {
  await tasksRepo.deleteById(boardId, id);
};

const deleteByBoardId = async boardId => {
  await tasksRepo.deleteByBoardId(boardId);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  deleteByBoardId
};
