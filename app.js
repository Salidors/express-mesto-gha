const { constants } = require('http2');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const usersRouter = require('./routers/users');
const cardsRouter = require('./routers/cards');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(usersRouter);
app.use(cardsRouter);
app.use((req, res, next) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'Тут ничего нет' });
  next();
});

app.use((err, req, res) => {
  res
    .status(err.statusCode || 500)
    .send({ message: err.message || 'Что-то случилось...' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
