const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello Questfinder!</h1>');
});

app.listen(3333, () => {
    console.log('Servidor iniciado na porta 3333');
    console.log('Acesso em http://localhost:3333');
});