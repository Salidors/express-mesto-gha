const http = require("http");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');

app.use(bodyParser.json());
app.use(express.static(root:"public"));

mongoose.connect("mongodb://localhost:27017/mynewdb");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const { PORT = 3000, BASE_PATH } = process.env;


app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log("Ссылка на сервер");
  console.log(BASE_PATH);
});

const server = http.createServer(() => {
  console.log("Пришёл запрос!");
});

app.use(usersRouter);

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

server.listen(3000);
