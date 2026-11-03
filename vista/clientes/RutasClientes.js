const express = require('express');
const router = express.Router();

// Controladores existentes
const registroClienteCtrl = require('../../controlador/clientes/CrearClienteControlador');
const loginClienteCtrl = require('../../controlador/clientes/LoginClienteControlador');
const verProductoCtrl = require('../../controlador/clientes/VerProductoControlador');
const desactivarClienteCtrl = require('../../controlador/clientes/DesactivarClienteControlador');

// RF-15: Controlador Gestión Pedido
const gestionPedidoCtrl = require('../../controlador/clientes/GestionPedidoControlador');

// Endpoints Clientes
router.post('/registro-cliente', registroClienteCtrl.registrar);
router.post('/login-cliente', loginClienteCtrl.login);
router.get('/productos-disponibles', verProductoCtrl.verProductos);
router.put('/desactivar-cuenta/:numeroDocumento', desactivarClienteCtrl.desactivar);

// RF-15: Cancelar y modificar pedido
router.put('/cancelar-pedido/:idPedido', gestionPedidoCtrl.cancelar);
router.put('/modificar-pedido/:idPedido', gestionPedidoCtrl.modificar);

module.exports = router;