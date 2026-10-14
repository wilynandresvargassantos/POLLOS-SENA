const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');

class CrearTrabajadorModelo {
    // Función para crear trabajador en POLLOS por parte del Administrador
    static async crearTrabajador(tipoD, numeroD, nom, dir, tel, email, contras) {
        const query = `
            INSERT INTO trabajadores 
            (tipoDocumento, numeroDocumento, nombres, direccion, telefono, correo, contrasena, rol, estado) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'Trabajador', 'Activo')
        `;

        try {
            const salto = 10;
            const contra = await bcrypt.hash(contras, salto);

            return await dbService.query(query, [tipoD, numeroD, nom, dir, tel, email, contra]);
        } catch (err) {
            throw new Error(`Error al registrar el trabajador: ${err.message}`);
        }
    }
}

module.exports = CrearTrabajadorModelo;