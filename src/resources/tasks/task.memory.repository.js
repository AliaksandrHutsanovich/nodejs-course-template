const Task = require('./task.model');

const getAll = async boardId => {
  const tasks = await Task.find({ boardId });
  return tasks;
};

const getById = async (boardId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId });
  return task;
};

const create = async (boardId, { title, order, description }) => {
  const task = new Task({
    title,
    order,
    description,
    userId: null,
    boardId,
    columnId: null
  });
  await task.save();
  return {
    id: task._id,
    _id: task.id,
    title,
    order,
    description,
    userId: null,
    boardId,
    columnId: null
  };
};

const update = async (
  boardId,
  id,
  { title, order, description, userId, columnId }
) => {
  const task = await Task.findOneAndUpdate(
    { _id: id },
    { title, order, description, userId, columnId, boardId }
  );
  return task;
};

const deleteById = async (boardId, id) => {
  const deletedTask = await Task.findByIdAndDelete(id);
  return deletedTask;
};

const deleteByBoardId = async boardId => {
  const ids = (await getAll(boardId)).map(({ _id }) => _id);
  for (const id of ids) {
    await Task.findByIdAndDelete(id);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  deleteByBoardId
};
