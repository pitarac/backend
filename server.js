const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Iniciar o bot do Telegram
require('./bot');

// Servir os arquivos estáticos do React
app.use(express.static(path.join(__dirname, '../app.capivara.online/build')));

// Endpoint para dados do Telegram
app.get('/api/telegram/user', async (req, res) => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const response = await axios.get(`https://api.telegram.org/bot${token}/getMe`);
    res.json(response.data.result);
  } catch (error) {
    console.error("Erro ao pegar dados do usuário do Telegram", error);
    res.status(500).send('Erro ao pegar dados do usuário do Telegram');
  }
});

// Para todas as outras rotas, renderize o arquivo index.html do React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app.capivara.online/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
