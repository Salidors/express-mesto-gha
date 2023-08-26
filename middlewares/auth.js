const { constants } = require('http2');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  let payload;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error();
    }

    const token = authorization.replace('Bearer ', '');

    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    const err = new Error('Необходима авторизация');
    err.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;
    next(err);
  }

  req.user = payload;
  next();
};
