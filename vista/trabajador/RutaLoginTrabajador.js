const express = require('express');
const router = express.Router();
const controlador = require('../../controlador/trabajador/LoginTrabajadorControlador');

// RF-05: Login de trabajador en POLLOS
router.post('/login-trabajador', controlador.login);

module.exports = router;