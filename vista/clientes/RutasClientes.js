const express = require('express');
const router = express.Router();

const clienteCtrl = require('../../controlador/clientes/CrearClienteControlador');
const loginClienteCtrl = require('../../controlador/clientes/LoginClienteControlador');

// Endpoints de Clientes
router.post('/registro-cliente', clienteCtrl.registrar);
router.post('/login-cliente', loginClienteCtrl.login);

module.exports = router;