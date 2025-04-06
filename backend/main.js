// Импорт основных для работы библиотек
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Импорт рутов для запросов и обработчика неизвестных ошибок
import codeReviewRoutes from "./source/routes/codeReviewRoutes.js";
import errorHandler from "./source/middlewares/errorHandler.js";

// Инициализация необходимых констант
dotenv.config()
// Ниже я запрещаю просматривать eslint 14 строку, так как он не понимает глобальный процесс который есть в dotenv
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000
const app = express()

// Использование .json для возможности получения json запросов и cors для кроссдоменных запросов
app.use(express.json())
app.use(cors())

// Установка основного поинта с созданными рутами в роутере
app.use('/api', codeReviewRoutes)

// Использование обработчика неизвестных ошибок
app.use(errorHandler)

// Чтобы жизнь стала проще запустим все вместе и бек и фронт
app.use(express.static('./source/public'))

// Запуск сервера
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})