const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
} = require("../controllers/user");

app.get("/users", getUsers);

app.get("/users/_id", getUserById);

app.post("/users", createUser);

app.delete("/users", deleteUserById);

module.exports = router;
