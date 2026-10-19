const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');

class RegistroClienteModelo {
    // Función para el autorregistro del cliente en POLLOS (RF-02)
    static async registrarCliente(numeroD, nom, tel, email, contras) {
        const query = `
            INSERT INTO clientes 
            (numeroDocumento, nombres, telefono, correo, contrasena) 
            VALUES (?, ?, ?, ?, ?)
        `;

        try {
            const salto = 10;
            const contra = await bcrypt.hash(contras, salto);

            return await dbService.query(query, [numeroD, nom, tel, email, contra]);
        } catch (err) {
            throw new Error(`Error al registrar cuenta de cliente: ${err.message}`);
        }
    }
}

module.exports = RegistroClienteModelo;