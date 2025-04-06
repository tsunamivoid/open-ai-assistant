// Импорт основной библиотеки
import express from "express";

// Импорт контроллера и мидлвара на проверку тела в запросе
import codeReviewController from "../controllers/codeReviewController.js";
import validateCode from "../middlewares/validateCode.js";

// Создание роутера
const router = express.Router()

// Обработка запросов на поинт
router.post('/code-review', validateCode, codeReviewController)


export default router