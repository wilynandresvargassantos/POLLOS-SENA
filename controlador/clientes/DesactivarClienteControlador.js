const modelo = require('../../modelo/clientes/DesactivarClienteModelo');

class DesactivarClienteControlador {
    static async desactivar(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'El identificador del cliente es obligatorio.' });
        }

        try {
            // 1. Verificar si existe el cliente
            const cliente = await modelo.buscarClientePorIdentificador(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado en el sistema.' });
            }

            // 2. Verificar si ya se encuentra inactivo
            if (cliente.estado === 'Inactivo') {
                return res.status(400).json({ error: 'La cuenta ya se encuentra desactivada.' });
            }

            // 3. Ejecutar la desactivación
            await modelo.desactivarCuenta(id);

            res.status(200).json({
                mensaje: 'Cuenta desactivada correctamente.',
                cliente: {
                    numeroDocumento: cliente.numeroDocumento,
                    nombres: cliente.nombres,
                    estado: 'Inactivo'
                }
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor: ' + err.message });
        }
    }
}

module.exports = DesactivarClienteControlador;