const { celebrate, Segments } = require('celebrate');
const Joi = require('joi');
const router = require('express').Router();

const {
  getUsers,
  patchUser,
  patchUserAvatar,
  getUser,
  getUserById,
} = require('../controllers/user');

router.get('/users', getUsers);

router.patch('/users/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
  }),
}), patchUser);

router.patch('/users/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string()
      .pattern(
        /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/,
      )
      .default(
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      ),
  }),
}), patchUserAvatar);

router.get('/users/me', getUser);

router.get('/users/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().length(24).required(),
  }),
}), getUserById);

module.exports = router;
