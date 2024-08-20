const express = require('express');
const app = express();

app.use(express.json());

// Função para iniciar o jogo
app.get('/start-game', (req, res) => {
    const { user_id, username } = req.query;

    if (!user_id || !username) {
        return res.status(400).send('Parâmetros user_id e username são necessários.');
    }

    // Lógica para configurar a sessão do jogo para o usuário
    console.log(`Iniciando jogo para usuário ${username} (ID: ${user_id})`);

    // Suponha que você salve a sessão em um banco de dados ou em memória
    // A resposta pode ser personalizada para o frontend do jogo
    res.send(`Jogo iniciado para ${username} com ID ${user_id}`);
});

// Função para salvar o progresso do jogo
app.post('/save-progress', (req, res) => {
    const { user_id, progress } = req.body;

    if (!user_id || !progress) {
        return res.status(400).send('Parâmetros user_id e progress são necessários.');
    }

    // Lógica para salvar o progresso do usuário
    console.log(`Salvando progresso do usuário ${user_id}:`, progress);

    res.send('Progresso salvo com sucesso.');
});

// Função para carregar o progresso do jogo
app.get('/load-progress', (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).send('Parâmetro user_id é necessário.');
    }

    // Lógica para carregar o progresso do usuário
    // Suponha que você busque o progresso em um banco de dados
    const progress = {}; // Substitua pelo progresso real do usuário

    console.log(`Carregando progresso para o usuário ${user_id}`);
    res.json(progress);
});

// Função para finalizar o jogo e registrar a pontuação
app.post('/end-game', (req, res) => {
    const { user_id, score } = req.body;

    if (!user_id || !score) {
        return res.status(400).send('Parâmetros user_id e score são necessários.');
    }

    // Lógica para registrar a pontuação final do usuário
    console.log(`Registrando pontuação de ${score} para o usuário ${user_id}`);

    res.send('Pontuação registrada com sucesso.');
});

app.listen(3000, () => {
    console.log('Backend do jogo rodando na porta 3000');
});
