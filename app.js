const express = require('express');
const hbs = require('hbs');
const path = require('path');
require('dotenv').config();

const router = require('./src/routes/routes');
const apiRouter = require('./src/routes/api.routes');

const app = express();

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(process.cwd(), 'src/views'));
hbs.registerPartials(path.join(process.cwd(), 'src/views/partials'));

app.use('/api', apiRouter);
app.use('/', router);

app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Página no encontrada</h1>
    <p>La página que buscas no existe.</p>
    <a href="/">Volver al inicio</a>
  `);
});

module.exports = app;