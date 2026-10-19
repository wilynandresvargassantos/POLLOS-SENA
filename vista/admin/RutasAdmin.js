const express = require('express');
const router = express.Router();

const CRutas = require('../../controlador/admin/CrearClienteControlador');
const TRutas = require('../../controlador/admin/CrearTrabajadorControlador');
const ARutas = require('../../controlador/admin/CrearAdminControlador');
const LRutas = require('../../controlador/admin/LoginAdminControlador');

// Endpoints de Administração com prefixo /seguridad
router.post('/seguridad/crearCliente', CRutas.crearCliente);
router.post('/seguridad/crearTrabajador', TRutas.crear);
router.post('/seguridad/crearAdmin', ARutas.crear);
router.post('/seguridad/loginAdmin', LRutas.login);

module.exports = router;