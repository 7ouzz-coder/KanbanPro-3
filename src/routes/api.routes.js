const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth');
const { register, login } = require('../controllers/authController');
const { getTableros, createTablero, updateTablero, deleteTablero, createLista, updateLista, deleteLista, createTarjeta, updateTarjeta, deleteTarjeta } = require('../controllers/apiController');

// auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// tableros routes con protección
router.get('/tableros', verifyToken, getTableros);
router.post('/tableros', verifyToken, createTablero);
router.put('/tableros/:id', verifyToken, updateTablero);
router.delete('/tableros/:id', verifyToken, deleteTablero);

// listas routes con protección
router.post('/tableros/:tableroId/listas', verifyToken, createLista);
router.put('/listas/:id', verifyToken, updateLista);
router.delete('/listas/:id', verifyToken, deleteLista);

// tarjetas routes con protección
router.post('/listas/:listaId/tarjetas', verifyToken, createTarjeta);
router.put('/tarjetas/:id', verifyToken, updateTarjeta);
router.delete('/tarjetas/:id', verifyToken, deleteTarjeta);

module.exports = router;