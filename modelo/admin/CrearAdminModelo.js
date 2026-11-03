const bcrypt = require('bcrypt');
const dbService = require('../bd/Conexion');

class CrearAdminModelo {
    static async crearAdmin(tipoD, numeroD, nom, dir, tel, email, contras) {
        // Encriptar la clave con hash bcrypt
        const salt = await bcrypt.genSalt(10);
        const contrasenaHash = await bcrypt.hash(contras, salt);

        const query = `
            INSERT INTO trabajadores 
            (tipoDocumento, numeroDocumento, nombres, direccion, telefono, correo, contrasena, rol, estado) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'Admin', 'Activo')
        `;

        try {
            const resultado = await dbService.query(query, [
                tipoD,
                numeroD,
                nom,
                dir,
                tel,
                email,
                contrasenaHash
            ]);
            return resultado;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = CrearAdminModelo;