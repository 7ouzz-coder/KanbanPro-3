const express = require('express');
const hbs = require('hbs');
const path = require('path');
require('dotenv').config();

const router = require('./src/routes/routes');
const apiRouter = require('./src/routes/api.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));

app.use('/api', apiRouter);
app.use('/', router);

app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Página no encontrada</h1>
    <p>La página que buscas no existe.</p>
    <a href="/">Volver al inicio</a>
  `);
});

app.listen(PORT, () => {
  console.log('-='.repeat(30));
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('-='.repeat(30));
});