const dbService = require('../bd/Conexion');

class VerProductoModelo {
    // Listar inventario de productos de pollo disponibles para el trabajador
    static async obtenerCatalogoTrabajador() {
        const query = `
            SELECT 
                idProducto,
                nombre,
                descripcion,
                precio,
                cantidadDisponible,
                estado
            FROM productos
            ORDER BY nombre ASC
        `;
        try {
            return await dbService.query(query);
        } catch (err) {
            throw new Error(`Error al consultar inventario de productos: ${err.message}`);
        }
    }
}

module.exports = VerProductoModelo;