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
  },
  owner: {
    type: ObjectId,
    required: true,
    enum: [],
  },
  likes: {
    type: Array,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  createdAt: {
    type: Date,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model("card", cardSchema);
