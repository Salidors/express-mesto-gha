module.exports = (validator) => (req, res, next) => {
  const { error } = validator(req.body);
  if (error) {
    return res
      .status(400)
      .send({ message: 'Ошибка валидации поймана при помощи Joi' });
  }
  next();
};
