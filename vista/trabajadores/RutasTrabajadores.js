const express = require('express');
const router = express.Router();

const loginTrabajadorCtrl = require('../../controlador/trabajadores/LoginTrabajadorControlador');
const verProductoTrabajadorCtrl = require('../../controlador/trabajadores/VerProductoControlador');
const editarProductoCtrl = require('../../controlador/trabajadores/EditarProductoControlador');
const eliminarProductoCtrl = require('../../controlador/trabajadores/EliminarProductoControlador');

// Endpoints de Trabajadores
router.post('/login-trabajador', loginTrabajadorCtrl.login); // RF-05
router.get('/inventario-productos', verProductoTrabajadorCtrl.verProductosTrabajador); // RF-08
router.put('/editar-producto/:idProducto', editarProductoCtrl.editar); // RF-09

// RF-10: Trabajador elimina producto
router.delete('/eliminar-producto/:idProducto', eliminarProductoCtrl.eliminar);

module.exports = router;