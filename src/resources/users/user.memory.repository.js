const uuid = require('uuid');
const User = require('./user.model');
const { users } = require('../../hardcodedData');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return Object.keys(users).map(key => users[key]);
};

const getById = async id => {
  return users[id];
};

const create = async ({ id = uuid(), name, login, password }) => {
  users[id] = new User({ id, name, login, password });
  return users[id];
};

const update = async (id, { name, login, password }) => {
  users[id] = new User({ id, name, login, password });
  return users[id];
};

const deleteById = async id => {
  delete users[id];
};

module.exports = { getAll, getById, create, update, deleteById };
