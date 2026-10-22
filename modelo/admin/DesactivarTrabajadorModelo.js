const dbService = require('../bd/Conexion');

class DesactivarTrabajadorModelo {
    static async buscarPorId(idtrabajador) {
        const query = 'SELECT * FROM trabajadores WHERE idtrabajador = ?';
        try {
            const filas = await dbService.query(query, [idtrabajador]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar trabajador: ${err.message}`);
        }
    }

    static async desactivar(idtrabajador) {
        const query = "UPDATE trabajadores SET estado = 'Inactivo' WHERE idtrabajador = ?";
        try {
            return await dbService.query(query, [idtrabajador]);
        } catch (err) {
            throw new Error(`Error al desactivar trabajador: ${err.message}`);
        }
    }
}

module.exports = DesactivarTrabajadorModelo;