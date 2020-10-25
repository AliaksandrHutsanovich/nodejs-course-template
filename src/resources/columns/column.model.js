const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const columnScheme = new Schema({
  title: String,
  order: Number
});

const Column = mongoose.model('Column', columnScheme);

module.exports = { Column, columnScheme };
