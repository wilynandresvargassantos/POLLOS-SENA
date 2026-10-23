const dbService = require('../bd/Conexion');

class DesactivarClienteModelo {
    static async buscarPorDocumento(numeroDocumento) {
        const query = 'SELECT * FROM clientes WHERE numeroDocumento = ?';
        try {
            const filas = await dbService.query(query, [numeroDocumento]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar cliente: ${err.message}`);
        }
    }

    static async desactivar(numeroDocumento) {
        const query = "UPDATE clientes SET estado = 'Inactivo' WHERE numeroDocumento = ?";
        try {
            return await dbService.query(query, [numeroDocumento]);
        } catch (err) {
            throw new Error(`Error al desactivar cliente: ${err.message}`);
        }
    }
}

module.exports = DesactivarClienteModelo;