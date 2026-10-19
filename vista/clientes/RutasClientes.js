const express = require('express');
const router = express.Router();

const clienteCtrl = require('../../controlador/clientes/CrearClienteControlador');
const loginClienteCtrl = require('../../controlador/clientes/LoginClienteControlador');
const verProductoCtrl = require('../../controlador/clientes/VerProductoControlador');

// Endpoints de Clientes
router.post('/registro-cliente', clienteCtrl.registrar);
router.post('/login-cliente', loginClienteCtrl.login);

// RF-06: Cliente visualiza productos disponibles por kg
router.get('/productos-disponibles', verProductoCtrl.verProductos);

module.exports = router;