const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
    console.log('Login: ' + req.body.login_campo, 'Senha: ' + req.body.senha_campo);
    res.send('Login recebido!');
});

app.get('/user/:userId(\\d+)', (req, res) => {
    res.send(`Usuário com ID: ${req.params.userId}`);
});

app.get('/api/data', (req, res) => {
    res.status(200).json({ message: "Aqui estão seus dados!", data: { item1: "valor1", item2: "valor2" } });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'error404.html'));
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
