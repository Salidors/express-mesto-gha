const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const usersRouter = require("./routes/users");

app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(usersRouter);

app.use((req, res, next) => {
  req.user = {
    _id: "64ca6b297252afdce090f6e0",
  };
  next();
});

module.exports = app;
