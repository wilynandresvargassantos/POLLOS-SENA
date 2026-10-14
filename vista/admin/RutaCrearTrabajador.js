const express = require('express');
const router = express.Router();
const controlador = require('../../controlador/admin/CrearTrabajadorControlador');

// RF-04: El administrador crea una cuenta de trabajador en POLLOS
router.post('/atrabajadores', controlador.crear);

module.exports = router;