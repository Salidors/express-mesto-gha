const UserModel = require('../models/user');

const getUsers = (req, res) =>
  UserModel.find()
    .then((user) => res.status(201).send(user))
    .catch(() => res.status(500).send('Server Error'));

const getUserById = (req, res) =>
  UserModel.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(404).send('User not found'));

const createUser = (req, res) =>
  UserModel.create({ ...req.body })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'validationError') {
        return res.status(400).send('validationError');
      }
      return res.status(422).send(req.body);
    });

const deleteUserById = (req, res) =>
  UserModel.findByIdAndRemove(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(422).send(req.body));

const patchUser = (req, res) =>
  UserModel.find(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(422).send(req.body));

const patchUserAvatar = (req, res) =>
  UserModel.find(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(422).send(req.body));

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  patchUser,
  patchUserAvatar,
};
