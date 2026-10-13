const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');

class CrearClienteModelo {
    // funcion para crear nuevos clientes por el admin
  static async crearClientes(nom, tipoD, numeroD, dir, tel, email, contras,) {
    const query = 'INSERT INTO clientes (nombres, tipoDocumento, numeroDocumento, direccion, telefono, correo, contrasena   ) VALUES (?, ?, ?, ?, ?, ?, ?)';

    try {
      // Generar el hash de la contraseña con bcrypt
      const salto = 10; // Nivel de seguridad de encriptación
      const contra = await bcrypt.hash(contras, salto);

      return await dbService.query(query, [nom, tipoD, numeroD, dir, tel, email, contra]);
    } catch (err) {
      throw new Error(`Error al crear su nueva cuenta: ${err.message}`);
    }
  }//cerrar crear cliente
}
module.exports = CrearClienteModelo;