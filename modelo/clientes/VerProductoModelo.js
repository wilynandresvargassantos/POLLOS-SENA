const dbService = require('../bd/Conexion');

class VerProductoModelo {
    // Listar productos de pollo activos con stock disponible (en kg)
    static async obtenerProductosDisponibles() {
        const query = `
            SELECT 
                idProducto,
                nombre,
                descripcion,
                precio,
                cantidadDisponible,
                estado
            FROM productos
            WHERE estado = 'Activo' AND cantidadDisponible > 0
            ORDER BY nombre ASC
        `;
        try {
            return await dbService.query(query);
        } catch (err) {
            throw new Error(`Error al consultar productos: ${err.message}`);
        }
    }

    // Consultar un corte de pollo específico por ID
    static async obtenerProductoPorId(idProducto) {
        const query = `
            SELECT 
                idProducto,
                nombre,
                descripcion,
                precio,
                cantidadDisponible,
                estado
            FROM productos
            WHERE idProducto = ? AND estado = 'Activo'
        `;
        try {
            const filas = await dbService.query(query, [idProducto]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al consultar producto: ${err.message}`);
        }
    }
}

module.exports = VerProductoModelo;