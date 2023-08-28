const { constants } = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');

const login = (req, res, next) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .select('+password')
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

      return res.send({ token });
    })
    .catch((e) => {
      const err = new Error(e.message);
      err.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
      return next(err);
    });
};

const getUsers = (req, res, next) => UserModel.find()
  .then((users) => res.send(users))
  .catch(() => {
    const err = new Error('Не удалось загрузить данные пользователя');
    err.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    return next(err);
  });

const getUser = (req, res, next) => UserModel.findById(req.user._id)
  .then((user) => res.send(user))
  .catch(() => {
    const err = new Error('Не удалось загрузить данные пользователя');
    err.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    return next(err);
  });

const getUserById = (req, res, next) => UserModel.findById(req.params.id)
  .orFail()
  .then((user) => res.send(user))
  .catch((e) => {
    let err;
    if (e.name === 'DocumentNotFoundError') {
      err = new Error('Пользователь не найден');
      err.statusCode = constants.HTTP_STATUS_NOT_FOUND;
    } else if (e.name === 'CastError') {
      err = new Error('Неверный идентификатор пользователя');
      err.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
    } else {
      err = new Error('Не удалось загрузить пользователя');
      err.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    }
    return next(err);
  });

const createUser = (req, res, next) => {
  const {
    email, name, about, avatar, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => UserModel.create({
      email, name, about, avatar, password: hash,
    }))
    .then(({ _doc }) => res.send({
      name: _doc.name,
      email: _doc.email,
      about: _doc.about,
      avatar: _doc.avatar,
    }))
    .catch((e) => {
      let err;
      if (e.name === 'ValidationError') {
        err = new Error('Ошибка валидации');
        err.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
      } else if (e.code === 11000) {
        err = new Error('Емейл уже занят');
        err.statusCode = constants.HTTP_STATUS_CONFLICT;
      } else {
        err = new Error('Не удалось создать пользователя');
        err.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
      }
      return next(err);
    });
};

const patchUser = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  UserModel.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((e) => {
      let err;
      if (e.name === 'DocumentNotFoundError') {
        err = new Error('Пользователь не найден');
        err.statusCode = constants.HTTP_STATUS_NOT_FOUND;
      } else if (e.name === 'ValidationError') {
        err = new Error(e.message);
        err.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
      } else if (e.name === 'CastError') {
        err = new Error('Неверный идентификатор пользователя');
        err.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
      } else {
        err = new Error('Не удалось обновить информацию о пользователе');
        err.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
      }
      return next(e);
    });
};

const patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;

  UserModel.findById(id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((e) => {
      let err;
      if (e.name === 'DocumentNotFoundError') {
        err = new Error('Пользователь не найден');
        err.statusCode = constants.HTTP_STATUS_NOT_FOUND;
      } else if (e.name === 'ValidationError') {
        err = new Error(e.message);
        err.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
      } else if (e.name === 'CastError') {
        err = new Error('Неверный идентификатор пользователя');
        err.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
      } else {
        err = new Error('Не удалось обновить аватар пользователя');
        err.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
      }
      return next(e);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUser,
  patchUserAvatar,
  login,
  getUser,
};
