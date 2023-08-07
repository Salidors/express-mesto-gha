const UserModel = require("../models/user");

const getUsers = (req, res) => {
  return UserModel.find()
    .then((user) => {
      return res.status(201).send(user);
    })
    .catch((err) => res.status(500).sent("Server Error"));
};

const getUserById = (req, res) => {
  return UserModel.findById(_Id)
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).sent("Server Error"));
};

const createUser = (req, res) => {
  return UserModel.create({ ...req.body })
    .then((user) => {
      return res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "validationError") {
        return res.status(400).send("validationError");
      }
      return res.status(201).send(req.body);
    });
};

const deleteUserById = (req, res) => {
  res.send("удаление пользователя");
};
