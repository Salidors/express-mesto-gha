const router = require("express").Router();

const {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  patchUser,
  patchUserAvatar,
} = require("../controllers/user");

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.post("/users", createUser);

router.delete("/users/:id", deleteUserById);

router.patch("/users/me", patchUser);

router.patch("/users/me/avatar", patchUserAvatar);

module.exports = router;
