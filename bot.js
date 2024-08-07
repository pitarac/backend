const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  const welcomeMessage = `
  Olá, ${firstName}! Bem-vindo ao Airdrop da Capivara Coin!

  Para participar do nosso airdrop e ganhar tokens grátis, siga as instruções abaixo:
  1. Acesse nosso airdrop e siga as etapas necessárias.
  2. Conecte a sua carteira TON.

  Se precisar de ajuda, sinta-se à vontade para nos contatar. Boa sorte!

  Equipe Capivara Coin 🦫
  `;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          
          { text: 'Visitar o nosso site', url: 'https://capivara.online?utm_source=telegram&utm_medium=bot&utm_campaign=site' }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});

bot.on('message', (msg) => {
  console.log(`Mensagem recebida de ${msg.chat.id}: ${msg.text}`);
});

console.log('Bot está rodando...');
