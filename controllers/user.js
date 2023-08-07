const UserModel = require("../models/user");

const getUsers = (req, res) => {
  return UserModel.find()
    .then((user) => {
      return res.status(201).send(user);
    })
    .catch((err) => res.status(500).send("Server Error"));
};

const getUserById = (req, res) => {
  return UserModel.findById(req.params.id)
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => res.status(404).send("User not found"));
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
      return res.status(422).send(req.body);
    });
};

const deleteUserById = (req, res) => {
  return UserModel.findByIdAndRemove(req.params.id)
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(422).send(req.body);
    });
};

const patchUser = (req, res) => {
  return UserModel.find(req.params.id)
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      return res.status(422).send(req.body);
    });
};

const patchUserAvatar = (req, res) => {
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
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  patchUser,
  patchUserAvatar,
};
