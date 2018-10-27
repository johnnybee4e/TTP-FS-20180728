const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const GphApiClient = require('giphy-js-sdk-core');
const client = GphApiClient(process.env.GIPHY_API_KEY);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/tag', async (req, res, next) => {
    try {
        let gifRes = await client.search('gifs', {'q': 'tag'});
        res.json(gifRes.data);
    } catch(err) {
        console.error(err);
    }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.listen(process.env.PORT || 3000);
