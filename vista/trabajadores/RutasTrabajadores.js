const express = require('express');
const router = express.Router();

const loginTrabajadorCtrl = require('../../controlador/trabajadores/LoginTrabajadorControlador');

// Endpoints de Trabalhadores
router.post('/login-trabajador', loginTrabajadorCtrl.login);

module.exports = router;