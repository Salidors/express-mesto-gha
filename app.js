const { constants } = require('http2');
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Segments, errors } = require('celebrate');
const Joi = require('joi');

const app = express();
const port = 3000;

const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const usersRouter = require('./routers/users');
const cardsRouter = require('./routers/cards');

app.use(express.json());

app.post('/signin', login);
app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
      about: Joi.string().min(2).max(30).default('Исследователь'),
      avatar: Joi.string()
        .pattern(
          /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/,
        )
        .default(
          'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
        ),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use(errors());
app.use(auth);

app.use(usersRouter);
app.use(cardsRouter);
app.use((req, res, next) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: 'Тут ничего нет' });
  next();
});

app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .send({ message: err.message || 'Что-то случилось...' });
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
