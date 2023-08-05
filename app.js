const http = require("http");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/mynewdb");
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log("Ссылка на сервер");
  console.log(BASE_PATH);
});

const server = http.createServer(() => {
  console.log("Пришёл запрос!");
});

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

server.listen(3000);
