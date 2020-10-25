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

const create = async ({ name, login, password }) => {
  const user = new User({ name, login, password });
  await user.save();
  return user;
};

const update = async (id, { name, login, password }) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { name, login, password }
  );
  return user;
};

const deleteById = async id => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

module.exports = { getAll, getById, create, update, deleteById };
