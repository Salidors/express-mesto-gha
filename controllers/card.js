const CardModel = require('../models/card');
const UserModel = require('../models/user');

const postCard =
  ('/',
  (req, res) => {
    const { name, link } = req.body; // получим из объекта запроса имя и описание пользователя

    CardModel.create({ name, link })
      // вернём записанные в базу данные
      .then((l) => res.send({ data: l }))
      // данные не записались, вернём ошибку
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  });

const postCardId =
  ('/:cardId',
  (req, res) => {
    CardModel.findById(req.params._id)
      .then((link) => res.send({ data: link }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  });

const getCard = (req, res) =>
  CardModel.find({})
    .then((link) => res.send({ data: link }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

const putLike = (req, res) =>
  UserModel.find(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(422).send(req.body));

const deleteLike = (req, res) =>
  UserModel.find(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(422).send(req.body));

module.exports = {
  postCard,
  postCardId,
  getCard,
  putLike,
  deleteLike,
};
