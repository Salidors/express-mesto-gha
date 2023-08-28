const { constants } = require('http2');

const CardModel = require('../models/card');

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  CardModel.create({ name, link, owner })
    .then((card) => res.status(constants.HTTP_STATUS_CREATED).send({ data: card }))
    .catch((e) => {
      let err;
      if (e.name === 'ValidationError') {
        err = new Error('Неверно заполнены поля');
        err.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
      } else {
        err = new Error('Не удалось создать карточку');
        err.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
      }
      return next(err);
    });
};

const getCards = (req, res, next) => CardModel.find()
  .then((cards) => res.send({ data: cards }))
  .catch(() => {
    const err = new Error('Не удалось загрузить карточки');
    err.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    return next(err);
  });

const putLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  CardModel.findByIdAndUpdate(
    cardId,
    {
      $push: { likes: userId },
    },
    { new: true },
  )
    .orFail()
    .then(() => res
      .status(constants.HTTP_STATUS_OK)
      .send({ message: 'Карточка лайкнута' }))
    .catch((e) => {
      let err;
      if (e.name === 'DocumentNotFoundError') {
        err = new Error('Карточка не найдена');
        err.statusCode = constants.HTTP_STATUS_NOT_FOUND;
      } else if (e.name === 'CastError') {
        err = new Error('Неверный формат данных');
        err.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
      } else {
        err = new Error('Нет возможности поставить like');
        err.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
      }
      return next(err);
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  CardModel.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: userId },
    },
    { new: true },
  )
    .orFail()
    .then(() => res.send({ message: 'Удалили лайк' }))
    .catch((e) => {
      let err;
      if (e.name === 'DocumentNotFoundError') {
        err = new Error('Карточка не найдена');
        err.statusCode = constants.HTTP_STATUS_NOT_FOUND;
      } else if (e.name === 'CastError') {
        err = new Error('Неверный формат данных');
        err.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
      } else {
        err = new Error('Нет возможности поставить like');
        err.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => CardModel.findById(req.params.cardId)
  .orFail()
  .then(({ _doc }) => {
    if (_doc.owner.equals(req.user._id)) {
      const error = new Error('Не ваша карта');
      error.statusCode = constants.HTTP_STATUS_FORBIDDEN;
      return next(error);
    }
    return res.status(constants.HTTP_STATUS_OK).send({ message: 'Карта удалена' });
  })
  .catch((e) => {
    let err;
    if (e.name === 'DocumentNotFoundError') {
      err = new Error('Карточка не найдена');
      err.statusCode = constants.HTTP_STATUS_NOT_FOUND;
    } else {
      err = new Error('Вы не можете удалить эту карточку');
      err.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    }
    return next(err);
  });

module.exports = {
  postCard,
  getCards,
  putLike,
  deleteLike,
  deleteCard,
};
