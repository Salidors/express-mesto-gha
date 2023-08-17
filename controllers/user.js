const { constants } = require('http2');

const UserModel = require('../models/user');

const getUsers = (req, res, next) =>
  UserModel.find()
    .then((users) => res.send(users))
    .catch((err) => {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Не удалось загрузить данные пользователя');
      return next(err);
    });

const getUserById = (req, res, next) =>
  UserModel.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY)
          .send('Неверный идентификатор пользователя');
      }

      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Не удалось загрузить пользователя');
      return next(err);
    });

const createUser = (req, res, next) =>
  UserModel.create({ ...req.body })
    .then((user) => res.status(constants.HTTP_STATUS_CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY)
          .send('Неверно заполнены поля');
      }

      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Не удалось создать пользователя');
      return next(err);
    });

const patchUser = (req, res, next) => {
  const { id, name, about } = req.body;
  UserModel.findByIdAndUpdate(id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        return res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY)
          .send('Неверный идентификатор пользователя');
      }
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Не удалось обновить информацию о пользователе');
      return next(err);
    });
};

const patchUserAvatar = (req, res, next) => {
  const { id, avatar } = req.body;
  UserModel.findById(id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY)
          .send('Неверный идентификатор пользователя');
      }
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Не удалось обновить аватар пользователя');
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
