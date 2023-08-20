const mongoose = require('mongoose');
const { default: isEmail } = require('validator/es/lib/isEmail');

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
    required: [true, 'Неоюходимо заполнить Email'],
    validator: isEmail('foo@bar.com'),
  },
  password: {
    type: String,
    required: [true, 'Неоюходимо заполнить Email'], // hash
  },
});

//   var validator = require('validator');
// validator.isEmail('foo@bar.com');

module.exports = mongoose.model('user', userSchema);
