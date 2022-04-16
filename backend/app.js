const express = require('express');
const cookieParser = require('cookie-parser');
const { urlencoded } = require('express');
const auth = require('./middleware/authentication');

const app = express();

app.use(express.json(), cookieParser, urlencoded({ extended: false }));
app.use(auth);

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;