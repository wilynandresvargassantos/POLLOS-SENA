const dbService = require('../bd/Conexion');

class EditarProductoModelo {
    // Buscar producto por ID para verificar existencia
    static async buscarPorId(idProducto) {
        const query = 'SELECT * FROM productos WHERE idProducto = ?';
        try {
            const filas = await dbService.query(query, [idProducto]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar producto: ${err.message}`);
        }
    }

    // Actualizar datos del producto (precio, stock en kg, descripcion, estado)
    static async actualizarProducto(idProducto, nombre, descripcion, precio, cantidadDisponible, estado) {
        const query = `
            UPDATE productos 
            SET nombre = ?, descripcion = ?, precio = ?, cantidadDisponible = ?, estado = ?
            WHERE idProducto = ?
        `;
        try {
            return await dbService.query(query, [nombre, descripcion, precio, cantidadDisponible, estado, idProducto]);
        } catch (err) {
            throw new Error(`Error al actualizar producto: ${err.message}`);
        }
    }
}

module.exports = EditarProductoModelo;