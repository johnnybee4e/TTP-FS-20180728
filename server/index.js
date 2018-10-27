const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');


if (process.env.NODE_ENV !== 'production') require('../secrets')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', require('./api'));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.listen(process.env.PORT || 3000);
