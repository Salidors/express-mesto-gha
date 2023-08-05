const Card = require("../models/card");

router.post("/", (req, res) => {
  const { name, link } = req.body; // получим из объекта запроса имя и описание пользователя

  Card.create({ name, link })
    // вернём записанные в базу данные
    .then((link) => res.send({ data: link }))
    // данные не записались, вернём ошибку
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
});

router.post("/:cardId", (req, res) => {
  Card.findById(req.params._id)
    .then((link) => res.send({ data: link }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
});

router.get((req, res) => {
  Card.find({})
    .then((link) => res.send({ data: link }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
});
