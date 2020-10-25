const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = board => boardsRepo.create(board);

const update = (id, { title, columns }) =>
  boardsRepo.update(id, { title, columns });

const deleteById = async id => {
  await boardsRepo.deleteById(id);
  await tasksService.deleteByBoardId(id);
};

module.exports = { getAll, getById, create, update, deleteById };
