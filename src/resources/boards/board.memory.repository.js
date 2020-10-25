const Board = require('./board.model');
const { Column } = require('../columns/column.model');

const getAll = async () => {
  const boards = await Board.find({});
  return boards;
};

const getById = async id => {
  const board = await Board.findOne({ _id: id });
  return board;
};

const create = async ({ title, columns }) => {
  const board = new Board({
    title,
    columns: columns.map(column => new Column(column))
  });
  await board.save();
  return board;
};

const update = async (id, { title, columns }) => {
  const board = await Board.findOneAndUpdate({ _id: id }, { title, columns });
  return board;
};

const deleteById = async id => {
  const deletedBoard = await Board.findByIdAndDelete(id);
  return deletedBoard;
};

module.exports = { getAll, getById, create, update, deleteById };
