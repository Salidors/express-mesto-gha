const errorStatus = {
  ok: 200,
  created: 201,
  serverError: 500,
  notFound: 404,
  DocumentNotFoundError: 'Документ не найден',
  CastError: 'Некорректный ID',
  ValidationError: 'Валидация провалена',
  UnprocessableEntity: 'Запрос прошел успешно, но есть ньюанс',
  BadRequest: 'Сервер в шоке, че ты хочешь вообще?',
  NotFound: 'Не могу найти...',
};

module.exports = { errorStatus };
