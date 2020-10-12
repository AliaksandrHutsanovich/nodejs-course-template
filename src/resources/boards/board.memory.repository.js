const uuid = require('uuid');
const Board = require('./board.model');
const { boards } = require('../../hardcodedData');

const getAll = async () => {
  return Object.keys(boards).map(key => boards[key]);
};

const getById = async id => {
  return boards[id];
};

const create = async ({ id = uuid(), title, columns }) => {
  boards[id] = new Board({ id, title, columns });
  return boards[id];
};

const update = async (id, { title, columns }) => {
  boards[id] = new Board({ id, title, columns });
  return boards[id];
};

const deleteById = async id => {
  delete boards[id];
};

module.exports = { getAll, getById, create, update, deleteById };
