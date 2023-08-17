const { constants } = require('http2');

const CardModel = require('../models/card');

const postCard = (req, res, next) => {
  const { name, link, owner } = req.body;
  CardModel.create({ name, link, owner })
    .then((card) =>
      res.status(constants.HTTP_STATUS_CREATED).send({ data: card })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY)
          .send('Неверно заполнены поля');
      }
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Не удалось создать карточку');
      return next(err);
    });
};

const getCards = (req, res, next) =>
  CardModel.find()
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Не удалось загрузить карточки');
      return next(err);
    });

const putLike = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.body;
  CardModel.findByIdAndUpdate(cardId, {
    $push: { likes: userId },
  })
    .then(() => res.status(constants.HTTP_STATUS_OK).send('Карточка лайкнута'))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY)
          .send('Неверный формат данных');
      }

      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Нет возможности поставить like');
      return next(err);
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.body;
  CardModel.findByIdAndUpdate(cardId, {
    $pull: { likes: userId._id },
  })
    .then((card) => {
      if (card.likes.some((l) => l === userId._id)) {
        return res.status(constants.HTTP_STATUS_OK).send('Удалили лайк');
      }
      return res.status(constants.HTTP_STATUS_NOT_FOUND).send('Не нашли лайк');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY)
          .send('Неверный формат данных');
      }
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Нет возможности удалить Like');
      return next(err);
    });
};

const deleteCard = (req, res, next) =>
  CardModel.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send('Не удалось найти карточку');
      }
      return res.status(constants.HTTP_STATUS_OK).send('Карта удалена');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY)
          .send('Неверный идентификатора карточки');
      }
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send('Вы не можете удалить эту карточку');
      return next(err);
    });

module.exports = {
  postCard,
  getCards,
  putLike,
  deleteLike,
  deleteCard,
};
