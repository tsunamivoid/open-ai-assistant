// Создание класса с методом для получения ответа от 'GPT' 
class OpenAi {
  constructor() {
    this.apiUrl = 'http://localhost:3000/api/code-review'
    this.chat = {
      completions: {
        create: this.create.bind(this),
      },
    }
  }

  async create({ messages }) {
    const userMessage = messages.find((msg) => msg.role === 'user')
    if (!userMessage || !userMessage.content) {
      throw new Error('Ваше сообщение не найдено, ну или оно пустое')
    }
    const code = userMessage.content

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Ниже я запрещаю eslint просматривать 26 строку так как model по сути не интересна, а необходима лишь потому, что в примере в теле запроса она использовалась

        body: JSON.stringify({ code })
      })

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (e) {
      return {
        choices: [
          {
            message: {
              role: 'assistant',
              content: `Произошла ошибка при получении ответа с сервера ${e.message}`
            }
          }
        ]
      }
    }
  }
}

export default OpenAi