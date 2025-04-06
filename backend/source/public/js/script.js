import OpenAi from "./openai.js";

const openai = new OpenAi()

async function sendMessage() {
  const codeInput = document.getElementById('codeInput')
  const code = codeInput.value.trim()

  if (!code) {
    alert('Настоятельно прошу вас вставить текст в поле перед отправкой')
    return
  }

  addMessageToChat(code, 'user')

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: code,
        },
      ],
    })

    const message = completion.choices[0].message.content
    addMessageToChat(message, 'assistant')
  } catch (e) {
    console.error(`Ошибка: ${e}`)
    addMessageToChat('Произошла ошибка при получении ответа от сервера', 'assistant')
  }

  codeInput.value = ''
}

function addMessageToChat(message, sender) {
  const chatWindow = document.getElementById('chatWindow')
  const messageDiv = document.createElement('div')

  messageDiv.classList.add('message', sender)
  messageDiv.textContent = message
  chatWindow.appendChild(messageDiv)

  chatWindow.scrollTop = chatWindow.scrollHeight
}

document.getElementById('sendButton')
.addEventListener('click', sendMessage)