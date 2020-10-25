const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const task = await tasksService.getById(
    req.params.boardId,
    req.params.taskId
  );
  res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = await tasksService.create(req.params.boardId, req.body);
  res.json(task);
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = await tasksService.update(
    req.params.boardId,
    req.params.taskId,
    req.body
  );
  res.json(task);
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  await tasksService.deleteById(req.params.boardId, req.params.taskId);
  res.json({});
});

module.exports = router;
