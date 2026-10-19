const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');

class LoginTrabajadorModelo {
    // Buscar al trabajador por su correo electrónico en bdpollos
    static async buscarPorCorreo(correo) {
        const query = 'SELECT * FROM trabajadores WHERE correo = ?';
        try {
            const filas = await dbService.query(query, [correo]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar trabajador: ${err.message}`);
        }
    }

    // Validar contraseña con bcrypt
    static async verificarContrasena(contrasenaIngresada, contrasenaHash) {
        return await bcrypt.compare(contrasenaIngresada, contrasenaHash);
    }
}

module.exports = LoginTrabajadorModelo;