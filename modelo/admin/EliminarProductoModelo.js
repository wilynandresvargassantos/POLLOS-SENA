const dbService = require('../bd/Conexion');

class EliminarProductoModelo {
    // Buscar si el producto existe antes de intentar suprimirlo
    static async buscarPorId(idProducto) {
        const query = 'SELECT * FROM productos WHERE idProducto = ?';
        try {
            const filas = await dbService.query(query, [idProducto]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar producto: ${err.message}`);
        }
    }

    // Eliminación del producto por parte del administrador
    static async eliminarProducto(idProducto) {
        const query = 'DELETE FROM productos WHERE idProducto = ?';
        try {
            return await dbService.query(query, [idProducto]);
        } catch (err) {
            throw new Error(`Error al eliminar producto: ${err.message}`);
        }
    }
}

module.exports = EliminarProductoModelo;