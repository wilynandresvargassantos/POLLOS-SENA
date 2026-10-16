const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');

class LoginAdminModelo {
    static async buscarPorCorreo(correo) {
        const query = 'SELECT * FROM administradores WHERE correo = ?';
        try {
            const filas = await dbService.query(query, [correo]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar administrador: ${err.message}`);
        }
    }

    static async verificarContrasena(contrasenaIngresada, contrasenaHash) {
        return await bcrypt.compare(contrasenaIngresada, contrasenaHash);
    }
}

module.exports = LoginAdminModelo;