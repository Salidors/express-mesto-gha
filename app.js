const { constants } = require('http2');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const usersRouter = require('./routers/users');
const cardsRouter = require('./routers/cards');

app.use(express.json());
app.use(usersRouter);
app.use(cardsRouter);
app.use((req, res, next) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send('Тут ничего нет');
  return next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
