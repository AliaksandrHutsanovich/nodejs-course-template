const router = require('express').Router();
const loginService = require('./login.service');
const userService = require('../users/user.service');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;
  const user = await loginService.getByLogin(login);
  if (!user) res.status(403).json({ message: 'Login is not correct' });
  const isValidPassword = await loginService.validatePassword(
    password,
    user.password
  );

  if (!isValidPassword) {
    res.status(403).json(new Error('Password is not correct'));
  }
  const accessToken = await loginService.getAccessToken(user);
  const { name } = user;
  await userService.update(user._id, { name, login, password, accessToken });
  res.status(200).json({ token: accessToken });
});

module.exports = router;
