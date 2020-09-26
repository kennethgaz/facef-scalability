const express = require('express');
const { default: got } = require('got/dist/source');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME || 'localhost';
const url = `http://${host}:${port}`;

app.use(express.json());

async function requestApi() {
    return await got('http://localhost:3000/', { retry: 3 })
}

app.get('/retry', async (req, resp) => {
    try {
        await requestApi();
    } catch(err) {
        resp.status(500).send("Erro ao chamar a API A")
    }

    resp.send("Sucesso ao chamar a API A");
})

app.listen(port, () => {
    console.log(`Aplicação rodando na url ${url}`);
})
