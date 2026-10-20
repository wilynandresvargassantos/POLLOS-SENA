const modelo = require('../../modelo/trabajadores/EliminarProductoModelo');

class EliminarProductoControlador {
    static async eliminar(req, res) {
        const { idProducto } = req.params;

        if (!idProducto || isNaN(idProducto)) {
            return res.status(400).json({ error: 'El ID del producto es obligatorio y debe ser numérico.' });
        }

        try {
            const producto = await modelo.buscarPorId(idProducto);
            if (!producto) {
                return res.status(404).json({ error: 'El producto seleccionado no existe o ya fue eliminado.' });
            }

            await modelo.eliminarProducto(idProducto);

            res.status(200).json({
                mensaje: 'El producto ha sido eliminado correctamente del catálogo.',
                idProductoEliminado: Number(idProducto),
                nombreProducto: producto.nombre
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor al eliminar el producto: ' + err.message });
        }
    }
}

module.exports = EliminarProductoControlador;