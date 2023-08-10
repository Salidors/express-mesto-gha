const errorStatus = {
  ok: 200,
  created: 201,
  serverError: 500,
  DocumentNotFoundError: 'Документ не найден',
  CastError: 'Некорректный ID',
  ValidationError: 'Валидация провалена',
  UnprocessableEntity: 'Запрос прошел успешно, но есть ньюанс',
  BadRequest: 'Сервер в шоке, че ты хочешь вообще?',
};

module.exports = { errorStatus };
