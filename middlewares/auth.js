const { constants } = require('http2');
const jwt = require('jsonwebtoken');

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
    const err = new Error('Необходима авторизация');
    err.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;
    next(err);
  }

  next();
};
