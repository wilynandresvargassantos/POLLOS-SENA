const dbService = require('../bd/Conexion');

class DesactivarClienteModelo {
    // Buscar cliente por número de documento en bdpollos
    static async buscarClientePorIdentificador(idOIdentificacion) {
        const query = 'SELECT * FROM clientes WHERE numeroDocumento = ?';
        try {
            const filas = await dbService.query(query, [idOIdentificacion]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al consultar cliente: ${err.message}`);
        }
    }

    // Cambiar estado a Inactivo (borrado lógico)
    static async desactivarCuenta(numeroDocumento) {
        const query = "UPDATE clientes SET estado = 'Inactivo' WHERE numeroDocumento = ?";
        try {
            return await dbService.query(query, [numeroDocumento]);
        } catch (err) {
            throw new Error(`Error al desactivar cuenta de cliente: ${err.message}`);
        }
    }
}

module.exports = DesactivarClienteModelo;