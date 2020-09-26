const express = require('express');
const requestPromise = require('request-promise');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME || 'localhost';
const url = `http://${host}:${port}`;

app.use(express.json());

async function requestApi(retryCount = 0, maxRetryCount = 3) {
    retryCount++;

    try {
        await requestPromise('http://localhost:3000/');
    } catch (err) {
        if (retryCount <= maxRetryCount) {
            return await requestApi(retryCount);
        } else {
            throw err
        }
    }
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
