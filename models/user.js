const mongoose = require('mongoose');
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
    required: [true, 'Необходимо заполнить Email'], // hash
  },
});

module.exports = mongoose.model('user', userSchema);
