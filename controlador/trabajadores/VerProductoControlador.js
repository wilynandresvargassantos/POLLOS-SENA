const modelo = require('../../modelo/trabajadores/VerProductoModelo');

class VerProductoControlador {
    static async verProductosTrabajador(req, res) {
        try {
            const productos = await modelo.obtenerCatalogoTrabajador();

            if (!productos || productos.length === 0) {
                return res.status(200).json({
                    mensaje: 'No hay productos registrados en el inventario actualmente.',
                    datos: []
                });
            }

            res.status(200).json({
                mensaje: 'Inventario de productos consultado con éxito.',
                totalItems: productos.length,
                unidadMedida: 'Kilogramos (kg)',
                productos: productos
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error al consultar inventario: ' + err.message });
        }
    }
}

module.exports = VerProductoControlador;