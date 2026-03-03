const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');

dotenv.config({ path: './popka 2.env' });

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('Не найден BOT_TOKEN в файле окружения. Проверь файл .env.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

console.log('Телеграм-бот запущен и ожидает сообщения...');

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from?.first_name || 'друг';

  bot.sendMessage(
    chatId,
    `Привет, ${name}! 👋\n\nЯ простой бот из проекта "popka". Напиши мне что-нибудь, и я тебе отвечу.`
  );
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';

  if (text.startsWith('/start')) return;

  bot.sendMessage(chatId, `Ты написал: "${text}"`);
});

