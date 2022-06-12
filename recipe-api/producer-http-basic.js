const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.listen(3001, () => {
    console.debug('Backend has started on port 3001');
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

app.get('/:id', async (req, res) => {
    console.log(`worker request pid=${process.pid}`);
    const id = Number(req.params.id);
    if (id !== 42) {
        res.jsonp({ error: 'not_found' })
    }
    res.jsonp({
        producer_pid: process.pid,
        recipe: {
            id,
            name: 'Chicken Tikka Masala',
            steps: 'Throw it in a pot...',
            ingredients: [
                { id: 1, name: "Chicken", quantity: "1 lb" },
                { id: 2, name: "Sauce", quantity: "2 cups" }
            ]
        }
    });
});