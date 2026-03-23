const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const { verifyToken } = require('../middlewares/auth');

// Rutas publicas sin protección
router.get('/', controller.home);
router.get('/register', controller.register);
router.post('/register', controller.procesarRegistro);
router.get('/login', controller.login);
router.post('/login', controller.procesarLogin);

// Rutas privadas con protección jwt
router.get('/dashboard', verifyToken, controller.dashboard);
router.post('/nueva-tarjeta', verifyToken, controller.crearTarjeta);

module.exports = router;