const express = require('express');
const router = express.Router();

const loginTrabajadorCtrl = require('../../controlador/trabajadores/LoginTrabajadorControlador');
const verProductoTrabajadorCtrl = require('../../controlador/trabajadores/VerProductoControlador');
const editarProductoCtrl = require('../../controlador/trabajadores/EditarProductoControlador');

// Endpoints de Trabajadores
router.post('/login-trabajador', loginTrabajadorCtrl.login); // RF-05
router.get('/inventario-productos', verProductoTrabajadorCtrl.verProductosTrabajador); // RF-08

// RF-09: Trabajador edita producto
router.put('/editar-producto/:idProducto', editarProductoCtrl.editar);

module.exports = router;