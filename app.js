const { constants } = require('http2');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const usersRouter = require('./routers/users');
const cardsRouter = require('./routers/cards');
const login = require('./routers/users');
const createUser = require('./routers/users');

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64d888973555e99e007b772c',
  };

  next();
});
app.use(usersRouter);
app.use(cardsRouter);
app.use((req, res, next) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'Тут ничего нет' });
  next();
  app.post('/signin', login);
  app.post('/signup', createUser);
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
