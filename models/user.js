const mongoose = require('mongoose');
const Joi = require('joi');

const { isEmail } = require('validator').default;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    default: 'Исследователь',
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: false,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: [true, 'Необходимо заполнить Email'],
    validator: isEmail('foo@bar.com'),
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Необходимо заполнить Password'],
    select: false,
  },
});

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string()
      .pattern(
        /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/
      )
      .default(
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
      ),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports = {
  userModel: mongoose.model('user', userSchema),
  validateUser,
};
