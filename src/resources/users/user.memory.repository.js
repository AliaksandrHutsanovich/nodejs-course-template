const User = require('./user.model');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  const users = await User.find({});
  return users;
};

const getById = async id => {
  const user = await User.findOne({ _id: id });
  return user;
};

const getByLogin = async login => {
  const user = await User.findOne({ login });
  return user;
};

const getByToken = async token => {
  const user = await User.findOne({ accessToken: token });
  return user;
};

const create = async user => {
  await user.save();
  return user;
};

const update = async (id, { name, login, password, accessToken }) => {
  let token;
  if (!accessToken) {
    token = (await User.findOne({ _id: id })).accessToken;
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    { name, login, password, accessToken: accessToken || token }
  );
  return user;
};

const deleteById = async id => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  getByLogin,
  getByToken
};
