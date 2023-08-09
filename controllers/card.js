const UserModel = require('../models/card');

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};

const postCard =
  ('/',
  (req, res) => {
    const { name, link } = req.body; // получим из объекта запроса имя и описание пользователя

    Card.create({ name, link })
      // вернём записанные в базу данные
      .then((link) => res.send({ data: link }))
      // данные не записались, вернём ошибку
      .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
  });

const postCardId =
  ('/:cardId',
  (req, res) => {
    Card.findById(req.params._id)
      .then((link) => res.send({ data: link }))
      .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
  });

const getCard = (req, res) => {
  Card.find({})
    .then((link) => res.send({ data: link }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const putLike = (req, res) => {
  return UserModel.find(req.params.id)
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(422).send(req.body);
    });
};

const deleteLike = (req, res) => {
  return UserModel.find(req.params.id)
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(422).send(req.body);
    });
};

module.exports = {
  postCard,
  postCardId,
  getCard,
  putLike,
  deleteLike,
};
