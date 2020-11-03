const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./user.model');
const usersService = require('./user.service');
const loginService = require('../login/login.service');
const { JWT_SECRET_KEY } = require('../../common/config');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const hashedPassword = await loginService.hashPassword(password);
  const generatedUser = usersService.generateUser({
    name,
    login,
    password: hashedPassword
  });
  const accessToken = jwt.sign(
    { userId: generatedUser._id, login },
    JWT_SECRET_KEY
  );
  generatedUser.accessToken = accessToken;
  const user = await usersService.create(generatedUser);
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.deleteById(req.params.id);
  res.json({});
});

module.exports = router;
