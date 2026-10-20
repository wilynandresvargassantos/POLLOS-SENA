const express = require('express');
const router = express.Router();

const clienteCtrl = require('../../controlador/clientes/CrearClienteControlador');
const loginClienteCtrl = require('../../controlador/clientes/LoginClienteControlador');
const verProductoCtrl = require('../../controlador/clientes/VerProductoControlador');
const desactivarClienteCtrl = require('../../controlador/clientes/DesactivarClienteControlador');

// Endpoints de Clientes
router.post('/registro-cliente', clienteCtrl.registrar);
router.post('/login-cliente', loginClienteCtrl.login);
router.get('/productos-disponibles', verProductoCtrl.verProductos);

// RF-07: Cliente desactiva su cuenta
router.put('/desactivar-cuenta/:id', desactivarClienteCtrl.desactivar);

module.exports = router;