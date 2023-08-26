const router = require('express').Router();

const {
  getUsers,
  getUserById,
  patchUser,
  patchUserAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.patch('/users/me', patchUser);

router.patch('/users/me/avatar', patchUserAvatar);

module.exports = router;
