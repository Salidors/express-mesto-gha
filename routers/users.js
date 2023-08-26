const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  patchUser,
  patchUserAvatar,
  login,
} = require('../controllers/user');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.patch('/users/me', patchUser);

router.patch('/users/me/avatar', patchUserAvatar);

router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;
