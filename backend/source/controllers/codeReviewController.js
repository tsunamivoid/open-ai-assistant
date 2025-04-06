// Импорт сервиса который анализирует присланный код и подбирает ответ
import getMockResponse from "../services/codeReviewService.js";

// Основная функция ответа пользователю
const codeReviewController = (req, res) => {
  const { code } = req.body
  const response = getMockResponse(code)
  res.status(200)
  .json({
    choices: [
      {
        message: response,
      },
    ],
  })
}

export default codeReviewController