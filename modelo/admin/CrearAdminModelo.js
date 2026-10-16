const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');

class CrearAdminModelo {
    static async crearAdmin(tipoD, numeroD, nom, dir, tel, email, contras) {
        const query = `
            INSERT INTO administradores 
            (tipoDocumento, numeroDocumento, nombres, direccion, telefono, correo, contrasena, rol, estado) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'Admin', 'Activo')
        `;

        try {
            const salto = 10;
            const contra = await bcrypt.hash(contras, salto);

            return await dbService.query(query, [tipoD, numeroD, nom, dir, tel, email, contra]);
        } catch (err) {
            throw new Error(`Error al registrar el administrador: ${err.message}`);
        }
    }
}

module.exports = CrearAdminModelo;