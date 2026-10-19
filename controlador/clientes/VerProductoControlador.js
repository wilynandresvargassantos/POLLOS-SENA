const modelo = require('../../modelo/clientes/VerProductoModelo');

class VerProductoControlador {
    static async verProductos(req, res) {
        const { idProducto } = req.query; // Permite consultar uno por query ?idProducto=1

        try {
            if (idProducto) {
                if (isNaN(idProducto)) {
                    return res.status(400).json({ error: 'El ID del producto debe ser numérico.' });
                }
                const producto = await modelo.obtenerProductoPorId(idProducto);
                if (!producto) {
                    return res.status(404).json({ error: 'Producto no encontrado o sin disponibilidad actual.' });
                }
                return res.status(200).json({
                    mensaje: 'Producto consultado con éxito.',
                    datos: producto
                });
            }

            const productos = await modelo.obtenerProductosDisponibles();

            if (!productos || productos.length === 0) {
                return res.status(200).json({ 
                    mensaje: 'No hay productos de pollo disponibles en este momento.', 
                    datos: [] 
                });
            }

            res.status(200).json({
                mensaje: 'Productos de pollo disponibles consultados con éxito.',
                total: productos.length,
                unidadMedida: 'Kilogramos (kg)',
                datos: productos
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor: ' + err.message });
        }
    }
}

module.exports = VerProductoControlador;