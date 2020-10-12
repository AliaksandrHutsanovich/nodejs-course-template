const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

const Task = require('../tasks/task.model');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  if (!board) {
    res.status(404).json({ message: 'No board with such id' });
  }
  res.json(board);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(req.body);
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.deleteById(req.params.id);
  res.json({});
});

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const task = await tasksService.getById(
    req.params.boardId,
    req.params.taskId
  );
  if (!task) {
    res.status(404).json({ message: 'No task with such id' });
  }
  res.json(task);
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
