const modelo = require('../../modelo/admin/DesactivarClienteModelo');

class DesactivarClienteControlador {
    static async modificarestado(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'El número de documento del cliente es obligatorio.' });
        }

        try {
            const cliente = await modelo.buscarPorDocumento(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado en el sistema.' });
            }

            if (cliente.estado === 'Inactivo') {
                return res.status(400).json({ error: 'El cliente ya se encuentra inactivo.' });
            }

            await modelo.desactivar(id);

            res.status(200).json({
                mensaje: 'Cliente desactivado correctamente por el administrador.',
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