const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
// require('dotenv').config();
// const GphApiClient = require('giphy-js-sdk-core');
// const client = GphApiClient(process.env.GIPHY_API_KEY);

if (process.env.NODE_ENV !== 'production') require('../secrets')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', require('./api'));
// app.get('/api/trending', async (req, res, next) => {
//     try {
//         let gifRes = await client.trending('gifs', {});
//         res.json(gifRes.data);
//     } catch(err) {
//         console.error(err);
//     }
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.listen(process.env.PORT || 3000);
