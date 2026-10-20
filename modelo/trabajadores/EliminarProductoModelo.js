const dbService = require('../bd/Conexion');

class EliminarProductoModelo {
    // Buscar el producto por ID para comprobar existencia
    static async buscarPorId(idProducto) {
        const query = 'SELECT * FROM productos WHERE idProducto = ?';
        try {
            const filas = await dbService.query(query, [idProducto]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar producto: ${err.message}`);
        }
    }

    // Eliminar el producto de la base de datos
    static async eliminarProducto(idProducto) {
        const query = 'DELETE FROM productos WHERE idProducto = ?';
        try {
            return await dbService.query(query, [idProducto]);
        } catch (err) {
            throw new Error(`Error al eliminar el producto: ${err.message}`);
        }
    }
}

module.exports = EliminarProductoModelo;