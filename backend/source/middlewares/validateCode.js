//Функция для проверки тела запроса
const validateCode = (req, res, next) => {
  const { code } = req.body
  if (!code || typeof code !== 'string') {
    return res.status(400)
    .json({
      message: 'Сообщение с кодом не может быть пустой строкой (как мое сердце)'
    })
  }
  next()
}


export default validateCode