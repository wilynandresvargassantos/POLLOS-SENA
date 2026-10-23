const express = require('express');
const router = express.Router();

const CRutas = require('../../controlador/admin/CrearClienteControlador');
const TRutas = require('../../controlador/admin/CrearTrabajadorControlador');
const ARutas = require('../../controlador/admin/CrearAdminControlador');
const LRutas = require('../../controlador/admin/LoginAdminControlador');
const EPRutas = require('../../controlador/admin/EditarProductoControlador');
const DelPRutas = require('../../controlador/admin/EliminarProductoControlador');
const MTRutas = require('../../controlador/admin/DesactivarTrabajadorControlador');
const ATRutas = require('../../controlador/admin/ActivarTrabajadorControlador');
const MCRutas = require('../../controlador/admin/DesactivarClienteControlador');
const ACRutas = require('../../controlador/admin/ActivarClienteControlador');

// Endpoints de Administración con prefijo /seguridad
router.post('/seguridad/crearCliente', CRutas.crearCliente); // RF01
router.post('/seguridad/crearTrabajador', TRutas.crear);      // RF04
router.post('/seguridad/crearAdmin', ARutas.crear);
router.post('/seguridad/loginAdmin', LRutas.login);
router.put('/seguridad/editarProducto/:idProducto', EPRutas.editar);       // RF11
router.delete('/seguridad/eliminarProducto/:idProducto', DelPRutas.eliminar); // RF12

// RF-13: Admin desactiva y activa trabajador
router.put('/seguridad/desactivartrabajador/:id', MTRutas.modificarestado);
router.put('/seguridad/activartrabajador/:id', ATRutas.modificarestado);

// RF-14: Admin desactiva y activa cliente
router.put('/seguridad/desactivarcliente/:id', MCRutas.modificarestado);
router.put('/seguridad/activarcliente/:id', ACRutas.modificarestado);

module.exports = router;