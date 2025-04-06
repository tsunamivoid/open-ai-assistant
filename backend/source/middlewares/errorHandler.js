// Функция обработки неизвестных ошибок
const errorHandler = (err, req, res, next) => {
  console.log(err.stack)
  res.status(500)
  .json({
    message: 'Что-то пошло не так, что-то я не проработал в логике сервера',
    error: err.message,
  })
  next()
}


export default errorHandler