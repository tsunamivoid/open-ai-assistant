import getMockResponse from "../source/services/codeReviewService.js";
import mockResponses from "../source/data/mockResponses.json" with { type: 'json' };

test('Проверка на наличие цикла for', () => {
  expect(getMockResponse('for (let i = 0; i++) { console.log(i) }')).toEqual(
    mockResponses[0]
  )
})

test('Функция не возвращает значение явно', () => {
  expect(getMockResponse('function add(a, b) { a + b }')).toEqual(
    mockResponses[1]
  )
})

test('Наличие старого типа var', () => {
  expect(getMockResponse('var count = 0')).toEqual(
    mockResponses[2]
  )
})

test('Наличие консоль лога', () => {
  expect(getMockResponse('console.log("Debugging...")')).toEqual(
    mockResponses[3]
  )
})

test('Изменение типа переменной (Привет Раст с его строгой типизацией )', () => {
  expect(getMockResponse('let num = 5 num = "5"')).toEqual(
    mockResponses[4]
  )
})