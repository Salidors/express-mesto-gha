const { constants } = require('http2');

const UserModel = require('../models/user');

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

const createUser = (req, res, next) =>
  UserModel.create({ ...req.body })
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

const patchUser = (req, res, next) => {
  const { id, name, about } = req.body;
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
  const { id, avatar } = req.body;
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
};
