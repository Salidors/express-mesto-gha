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
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Неверно заполнены поля' });
      }
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Не удалось создать карточку' });
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
  CardModel.findByIdAndUpdate(
    cardId,
    {
      $push: { likes: userId },
    },
    { new: true }
  )
    .orFail()
    .then(() =>
      res
        .status(constants.HTTP_STATUS_OK)
        .send({ message: 'Карточка лайкнута' })
    )
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
      }

      if (err.name === 'CastError') {
        return res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Неверный формат данных' });
      }

      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Нет возможности поставить like' });
      return next(err);
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.body;
  CardModel.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: userId._id },
    },
    { new: true }
  )
    .orFail()
    .then(() =>
      res.status(constants.HTTP_STATUS_OK).send({ message: 'Удалили лайк' })
    )
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Карточка не найдена' });
      }

      if (err.name === 'CastError') {
        return res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Неверный формат данных' });
      }
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Нет возможности удалить Like' });
      return next(err);
    });
};

const deleteCard = (req, res, next) =>
  CardModel.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then(() => res.status(constants.HTTP_STATUS_OK).send('Карта удалена'))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send('Карточка не найдена');
      }

      if (err.name === 'CastError') {
        return res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
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
