const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');

class LoginClienteModelo {
    // Buscar al cliente por su correo electrónico
    static async buscarPorCorreo(correo) {
        const query = 'SELECT * FROM clientes WHERE correo = ?';
        try {
            const filas = await dbService.query(query, [correo]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar cliente: ${err.message}`);
        }
    }

    // Validar contraseña plana contra la encriptada
    static async verificarContrasena(contrasenaIngresada, contrasenaHash) {
        return await bcrypt.compare(contrasenaIngresada, contrasenaHash);
    }
}

module.exports = LoginClienteModelo;