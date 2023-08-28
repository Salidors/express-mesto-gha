const { celebrate, Segments } = require('celebrate');
const Joi = require('joi');
const router = require('express').Router();

const {
  putLike,
  deleteLike,
  postCard,
  getCards,
  deleteCard,
} = require('../controllers/card');

router.put('/cards/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
}), putLike);
router.delete('/cards/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
}), deleteCard);
router.delete('/cards/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
}), deleteLike);
router.post('/cards', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string()
      .pattern(
        /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/,
      )
      .required(),
  }),
}), postCard);
router.get('/cards', getCards);

module.exports = router;
