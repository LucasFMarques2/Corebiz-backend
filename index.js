/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productsData = require('./data/products');
const newsletterRoute = require('./routes/newsletter');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/products', (req, res) => {
    res.json(productsData);
});

app.use('/api', newsletterRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
