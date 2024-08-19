const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  const username = msg.from.username;  // Captura o username do usuário
  const userId = msg.from.id;  // Captura o ID do usuário

  // Você pode enviar esses dados para o backend do seu jogo
  console.log(`Usuário iniciou o bot: ${username} (ID: ${userId})`);

  const welcomeMessage = `
  Olá, ${firstName}! Bem-vindo ao Airdrop da Capivara Coin!

  Para participar do nosso airdrop e jogar nosso game, clique nos botões abaixo:
  `;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { 
            text: 'Visitar o nosso site', 
            url: 'https://capivara.online?utm_source=telegram&utm_medium=bot&utm_campaign=site'
          },
          { 
            text: 'Jogar Capivara Coin', 
            callback_data: `start_game_${userId}_${username}`  // Usando callback_data para manipulação no backend
          }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});

bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;

  if (data.startsWith('start_game_')) {
    const params = data.split('_');
    const userId = params[2];
    const username = params[3];

    // Aqui você poderia enviar uma requisição para o backend do seu jogo
    // incluindo os parâmetros capturados
    const gameUrl = `https://game.capivara.online/?user_id=${userId}&username=${username}`;

    bot.answerCallbackQuery(callbackQuery.id)
      .then(() => bot.sendMessage(msg.chat.id, `Iniciando o jogo para ${username}...`))
      .then(() => bot.sendMessage(msg.chat.id, gameUrl));
  }
});

console.log('Bot está rodando...');
