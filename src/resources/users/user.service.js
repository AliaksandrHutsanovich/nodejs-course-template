const User = require('./user.model');
const loginService = require('../login/login.service');

const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const generateUser = ({ name, login, password }) =>
  new User({ name, login, password });

const create = user => usersRepo.create(user);

const update = async (id, { name, login, password, accessToken }) => {
  const hashedPassword = await loginService.hashPassword(password);
  return usersRepo.update(id, {
    name,
    login,
    password: hashedPassword,
    accessToken
  });
};

const deleteById = id => {
  usersRepo.deleteById(id);
};

const getByToken = token => usersRepo.getByToken(token);

const getByLogin = login => usersRepo.getByLogin(login);

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  generateUser,
  getByToken,
  getByLogin
};
