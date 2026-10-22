const modelo = require('../../modelo/admin/EliminarProductoModelo');

class EliminarProductoControlador {
    static async eliminar(req, res) {
        const { idProducto } = req.params;

        if (!idProducto || isNaN(idProducto)) {
            return res.status(400).json({ error: 'El ID del producto es obligatorio y debe ser numérico.' });
        }

        try {
            const producto = await modelo.buscarPorId(idProducto);
            if (!producto) {
                return res.status(404).json({ error: 'El producto seleccionado no existe o ya fue eliminado del sistema.' });
            }

            await modelo.eliminarProducto(idProducto);

            res.status(200).json({
                mensaje: 'Producto eliminado correctamente por el administrador.',
                idProductoEliminado: Number(idProducto),
                nombreProducto: producto.nombre
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor al eliminar el producto: ' + err.message });
        }
    }
}

module.exports = EliminarProductoControlador;