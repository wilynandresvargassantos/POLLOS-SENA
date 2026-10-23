const dbService = require('../bd/Conexion');

class ActivarClienteModelo {
    static async buscarPorDocumento(numeroDocumento) {
        const query = 'SELECT * FROM clientes WHERE numeroDocumento = ?';
        try {
            const filas = await dbService.query(query, [numeroDocumento]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar cliente: ${err.message}`);
        }
    }

    static async activar(numeroDocumento) {
        const query = "UPDATE clientes SET estado = 'Activo' WHERE numeroDocumento = ?";
        try {
            return await dbService.query(query, [numeroDocumento]);
        } catch (err) {
            throw new Error(`Error al activar cliente: ${err.message}`);
        }
    }
}

module.exports = ActivarClienteModelo;