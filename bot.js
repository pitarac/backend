const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    const username = msg.from.username;
    const userId = msg.from.id;

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
                    { 
                        text: 'Visitar o nosso site', 
                        url: 'https://capivara.online?utm_source=telegram&utm_medium=bot&utm_campaign=site'
                    },
                    { 
                        text: 'Jogar Capivara Coin', 
                        url: `https://t.me/Capivaracoin_bot?start=game_${userId}_${username}`
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

    if (data.startsWith('game_')) {
        const params = data.split('_');
        const userId = params[1];
        const username = params[2];

        const gameUrl = `https://game.capivara.online?user_id=${userId}&username=${username}`;

        bot.answerCallbackQuery(callbackQuery.id)
            .then(() => bot.sendMessage(msg.chat.id, `Iniciando o jogo para ${username}...`))
            .then(() => bot.sendMessage(msg.chat.id, gameUrl));
    }
});

console.log('Bot está rodando...');
