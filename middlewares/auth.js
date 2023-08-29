const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error();
    }

    const token = authorization.replace('Bearer ', '');

    const payload = jwt.verify(token, 'some-secret-key');
    req.user = payload;
  } catch (e) {
    const err = new UnauthorizedError('Необходима авторизация');
    next(err);
  }

  next();
};
