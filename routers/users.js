const router = require('express').Router();

const {
  getUser,
  getUsers,
  getUserById,
  patchUser,
  patchUserAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.get('/users/me', getUser);

router.patch('/users/me', patchUser);

router.patch('/users/me/avatar', patchUserAvatar);

module.exports = router;
