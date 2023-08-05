const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    about: URL,
  },
  owner: {
    type: ObjectId,
    required: true,
    array: [],
  },
  likes: {
    type: Array,
    required: true,
    array: [],
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
