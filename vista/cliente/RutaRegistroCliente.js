const express = require('express');
const router = express.Router();
const controlador = require('../../controlador/cliente/RegistroClienteControlador');

// RF-02: El cliente crea su propia cuenta
router.post('/registro-cliente', controlador.registrar);

module.exports = router;