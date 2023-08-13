const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const usersRouter = require('./routers/users');
const cardsRouter = require('./routers/cards');

app.use(express.json());
app.use(usersRouter);
app.use(cardsRouter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
