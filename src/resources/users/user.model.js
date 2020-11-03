const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
  name: String,
  login: String,
  password: String,
  accessToken: String
});

const User = mongoose.model('User', userScheme);

User.toResponse = user => {
  const { _id: id, name, login } = user;
  return { id, name, login };
};

module.exports = User;
