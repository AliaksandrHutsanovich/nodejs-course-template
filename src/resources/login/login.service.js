const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRepo = require('../users/user.memory.repository');
const { JWT_SECRET_KEY } = require('../../common/config');

const getByLogin = login => usersRepo.getByLogin(login);

const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const hashPassword = async password => {
  return await bcrypt.hash(password, 10);
};

const getAccessToken = ({ _id, login }) =>
  jwt.sign({ userId: _id, login }, JWT_SECRET_KEY);

module.exports = { getByLogin, validatePassword, hashPassword, getAccessToken };
