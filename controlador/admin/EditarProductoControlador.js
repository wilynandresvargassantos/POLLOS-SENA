const modelo = require('../../modelo/admin/EditarProductoModelo');

class EditarProductoControlador {
    static async editar(req, res) {
        const { idProducto } = req.params;
        const { t1: nombre, t2: descripcion, t3: precio, t4: cantidadDisponible, t5: estado } = req.body;

        // Validaciones
        if (!idProducto || isNaN(idProducto)) {
            return res.status(400).json({ error: 'El ID del producto es obligatorio y debe ser numérico.' });
        }

        if (!nombre || !descripcion || precio === undefined || cantidadDisponible === undefined || !estado) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        if (isNaN(precio) || Number(precio) < 0) {
            return res.status(400).json({ error: 'El precio debe ser un número válido mayor o igual a 0.' });
        }

        if (isNaN(cantidadDisponible) || Number(cantidadDisponible) < 0) {
            return res.status(400).json({ error: 'La cantidad disponible debe ser un valor numérico en kg mayor o igual a 0.' });
        }

        if (estado !== 'Activo' && estado !== 'Inactivo') {
            return res.status(400).json({ error: "El estado debe ser 'Activo' o 'Inactivo'." });
        }

        try {
            const producto = await modelo.buscarPorId(idProducto);
            if (!producto) {
                return res.status(404).json({ error: 'El producto seleccionado no existe en el sistema.' });
            }

            await modelo.actualizarProducto(idProducto, nombre, descripcion, precio, cantidadDisponible, estado);

            res.status(200).json({
                mensaje: 'Producto actualizado correctamente por el administrador.',
                producto: {
                    idProducto: Number(idProducto),
                    nombre,
                    descripcion,
                    precio: Number(precio).toFixed(2),
                    cantidadDisponibleKg: Number(cantidadDisponible).toFixed(2),
                    estado
                }
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor: ' + err.message });
        }
    }
}

module.exports = EditarProductoControlador;