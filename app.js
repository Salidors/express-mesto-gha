const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const usersRouter = require('./routers/users');
const cardsRouter = require('./routers/cards');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use((req, res, next) => {
  req.user = {
    _id: '64ca6b297252afdce090f6e0',
  };
  next();
});

app.use(usersRouter);
app.use(cardsRouter);

module.exports = app;
