const CardModel = require('../models/card');
const { errorStatus } = require('../constants/errors');

const postCard = (req, res) => {
  const { name, link, owner } = req.body;
  CardModel.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() =>
      res.status(errorStatus.serverError).send(errorStatus.BadRequest)
    );
};

const getCards = (req, res) =>
  CardModel.find()
    .then((cards) => {
      if (!cards || !cards.length) {
        res.status(errorStatus.notFound).send(errorStatus.NotFound);
        return;
      }
      res.send({ data: cards });
    })
    .catch(() =>
      res.status(errorStatus.serverError).send(errorStatus.BadRequest)
    );

const putLike = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.body;
  CardModel.findByIdAndUpdate(cardId, {
    $push: { likes: userId },
  })
    .then((card) => res.status(errorStatus.ok).send(card))
    .catch(() => res.status(errorStatus.UnprocessableEntity).send(req.body));
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.body;
  CardModel.findByIdAndUpdate(cardId, {
    $pull: { likes: userId._id },
  })
    .then((card) => res.status(errorStatus.ok).send(card))
    .catch(() => res.status(errorStatus.UnprocessableEntity).send(req.body));
};

const deleteCard = (req, res) =>
  CardModel.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(errorStatus.notFound).send(errorStatus.NotFound);
        return;
      }
      res.status(errorStatus.ok).send({ data: card });
    })
    .catch(() => res.status(errorStatus.UnprocessableEntity).send(req.body));

module.exports = {
  postCard,
  getCards,
  putLike,
  deleteLike,
  deleteCard,
};
