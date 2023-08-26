const { constants } = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');

const login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then(async (user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '1w',
      });

      res.send({ token });
    })
    .catch((err) => {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

const getUsers = (req, res, next) =>
  UserModel.find()
    .then((users) => res.send(users))
    .catch((err) => {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Не удалось загрузить данные пользователя' });
      return next(err);
    });

const getUserById = (req, res, next) =>
  UserModel.findById(req.params.id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }

      if (err.name === 'CastError') {
        return res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Неверный идентификатор пользователя' });
      }

      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Не удалось загрузить пользователя' });
      return next(err);
    });

const createUser = (req, res, next) => {
  const { email, name, about, avatar, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      UserModel.create({ email, name, about, avatar, password: hash })
    )
    .then((user) => res.status(constants.HTTP_STATUS_CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: err.message });
      }

      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Не удалось создать пользователя' });
      return next(err);
    });
};

const patchUser = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  UserModel.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }

      if (err.name === 'ValidationError') {
        return res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: err.message });
      }

      if (err.name === 'CastError') {
        return res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Неверный идентификатор пользователя' });
      }

      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Не удалось обновить информацию о пользователе' });
      return next(err);
    });
};

const patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;

  UserModel.findById(id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }

      if (err.name === 'ValidationError') {
        return res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: err.message });
      }

      if (err.name === 'CastError') {
        return res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Неверный идентификатор пользователя' });
      }
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Не удалось обновить аватар пользователя' });
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUser,
  patchUserAvatar,
  login,
};
