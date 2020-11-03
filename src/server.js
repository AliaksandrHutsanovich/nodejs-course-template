const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const userService = require('./resources/users/user.service');
const User = require('./resources/users/user.model');
const loginService = require('./resources/login/login.service');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.once('open', async () => {
  console.log('We are connected');
  // add user with login admin and password admin to database
  const admin = await userService.getByLogin('admin');
  if (!admin) {
    const hashedPassword = await loginService.hashPassword('admin');
    await userService.create(
      new User({
        name: 'admin',
        login: 'admin',
        password: hashedPassword,
        accessToken: 'aaa'
      })
    );
  }
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
