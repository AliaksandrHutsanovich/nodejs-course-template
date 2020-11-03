const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const passport = require('passport');
const userService = require('./resources/users/user.service');
const BearerStrategy = require('passport-http-bearer');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const loginRouter = require('./resources/login/login.router');
const { finished } = require('stream');
const {
  StatusCodes: { INTERNAL_SERVER_ERROR },
  getStatusText
} = require('http-status-codes');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req, res, next) => {
  const { url, params, body, method } = req;
  const start = Date.now();

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    console.log(`
      ${method} ${url} ${JSON.stringify(params)} ${JSON.stringify(
      body
    )} ${statusCode} ${ms}ms`);
  });
  next();
});

app.use((err, req, res, next) => {
  if (err) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
});

passport.use(
  new BearerStrategy(async (token, done) => {
    const user = await userService.getByToken(token);
    if (!user) {
      return done(null, false);
    }
    return done(null, user, { scope: 'all' });
  })
);

app.use('/login', loginRouter);

app.use(
  '/users',
  passport.authenticate('bearer', { session: false }),
  userRouter
);

app.use(
  '/boards',
  passport.authenticate('bearer', { session: false }),
  boardRouter
);

process.on('uncaughtException', error => {
  console.error(`capture error: ${error.message}`);
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
});

module.exports = app;
