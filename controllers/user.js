const UserModel = require('../models/user');
const { errorStatus } = require('../constants/errors');

const getUsers = (req, res) =>
  UserModel.find()
    .then((user) => res.status(errorStatus.created).send(user))
    .catch(() => res.status(errorStatus.serverError).send('Server Error'));

const getUserById = (req, res) =>
  UserModel.findById(req.params.id)
    .then((user) => res.status(errorStatus.ok).send(user))
    .catch(() => res.status(errorStatus.CastError).send('User not found'));

const createUser = (req, res) =>
  UserModel.create({ ...req.body })
    .then((user) => res.status(errorStatus.created).send(user))
    .catch((err) => {
      if (err.name === 'validationError') {
        return res.status(errorStatus.BadRequest).send('validationError');
      }
      return res.status(errorStatus.UnprocessableEntity).send(req.body);
    });

const deleteUserById = (req, res) =>
  UserModel.findByIdAndRemove(req.params.id)
    .then((user) => res.status(errorStatus.ok).send(user))
    .catch(() => res.status(errorStatus.UnprocessableEntity).send(req.body));

const patchUser = (req, res) =>
  UserModel.find(req.params.id)
    .then((user) => res.status(errorStatus.ok).send(user))
    .catch(() => res.status(errorStatus.UnprocessableEntity).send(req.body));

const patchUserAvatar = (req, res) =>
  UserModel.find(req.params.id)
    .then((user) => res.status(errorStatus.ok).send(user))
    .catch(() => res.status(errorStatus.UnprocessableEntity).send(req.body));

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  patchUser,
  patchUserAvatar,
};
