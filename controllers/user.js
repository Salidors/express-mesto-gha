const UserModel = require('../models/user');
const { errorStatus } = require('../constants/errors');

const getUsers = (req, res) =>
  UserModel.find()
    .then((users) => {
      if (!users || !users.length) {
        res.status(errorStatus.notFound).send(errorStatus.NotFound);
        return;
      }

      res.status(errorStatus.created).send(users);
    })
    .catch(() => res.status(errorStatus.serverError).send('Server Error'));

const getUserById = (req, res) =>
  UserModel.findById(req.params.id)
    .then((user) => res.status(errorStatus.ok).send(user))
    .catch(() => res.status(errorStatus.notFound).send(errorStatus.NotFound));

const createUser = (req, res) =>
  UserModel.create({ ...req.body })
    .then((user) => res.status(errorStatus.created).send(user))
    .catch((err) => {
      if (err.name === 'validationError') {
        return res.status(errorStatus.BadRequest).send('validationError');
      }
      return res.status(errorStatus.UnprocessableEntity).send(req.body);
    });

const patchUser = (req, res) => {
  const { id, about } = req.body;
  UserModel.findByIdAndUpdate(id, { about })
    .then((user) => {
      if (!user) {
        res.status(errorStatus.notFound).send(errorStatus.NotFound);
        return;
      }
      res.send(user);
    })
    .catch(() => res.status(errorStatus.UnprocessableEntity).send(req.body));
};

const patchUserAvatar = (req, res) => {
  const { id, avatar } = req.body;
  UserModel.findById(id, { avatar })
    .then((user) => {
      if (!user) {
        res.status(errorStatus.notFound).send(errorStatus.NotFound);
        return;
      }
      res.send(user);
    })
    .catch(() => res.status(errorStatus.UnprocessableEntity).send(req.body));
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUser,
  patchUserAvatar,
};
