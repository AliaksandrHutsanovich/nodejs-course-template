const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { columnScheme } = require('../columns/column.model');

const boardScheme = new Schema({
  title: String,
  columns: [columnScheme]
});

const Board = mongoose.model('Board', boardScheme);

Board.toResponse = board => {
  const { _id: id, title, columns } = board;
  return { id, title, columns };
};

module.exports = Board;
