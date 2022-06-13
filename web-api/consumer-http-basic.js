const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const TARGET = process.env.TARGET || 'localhost:3001';
// const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
    console.debug(`Backend has started on port ${PORT}`);
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use(express.json({
    extended: true,
    inflate: true,
    limit: '100kb',
    parameterLimit: 1000,
    type: 'application/x-www-form-urlencoded',
    verify: undefined
}));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.get('/', async (req, res) => {
    const request = await fetch(`http://${TARGET}/recipes/42`);
    const producerData = await request.json();

    res.jsonp({
        consumerPid: process.pid,
        producerData
    });
});


