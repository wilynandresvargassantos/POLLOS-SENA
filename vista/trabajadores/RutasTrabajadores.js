const express = require('express');
const router = express.Router();

const loginTrabajadorCtrl = require('../../controlador/trabajadores/LoginTrabajadorControlador');
const verProductoTrabajadorCtrl = require('../../controlador/trabajadores/VerProductoControlador');

// Endpoints de Trabajadores
router.post('/login-trabajador', loginTrabajadorCtrl.login); // RF-05

// RF-08: Trabajador visualiza inventario de productos de pollo
router.get('/inventario-productos', verProductoTrabajadorCtrl.verProductosTrabajador);

module.exports = router;