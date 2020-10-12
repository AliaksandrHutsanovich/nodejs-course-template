const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = user => usersRepo.create(user);

const update = (id, { name, login, password }) =>
  usersRepo.update(id, { name, login, password });

const deleteById = id => {
  usersRepo.deleteById(id);
  tasksService.resetByUserId(id);
};

module.exports = { getAll, getById, create, update, deleteById };
