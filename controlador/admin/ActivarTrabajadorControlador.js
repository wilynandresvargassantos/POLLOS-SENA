const modelo = require('../../modelo/admin/ActivarTrabajadorModelo');

class ActivarTrabajadorControlador {
    static async modificarestado(req, res) {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'El ID del trabajador es obligatorio y numérico.' });
        }

        try {
            const trabajador = await modelo.buscarPorId(id);
            if (!trabajador) {
                return res.status(404).json({ error: 'Trabajador no encontrado en el sistema.' });
            }

            if (trabajador.estado === 'Activo') {
                return res.status(400).json({ error: 'El trabajador ya se encuentra activo.' });
            }

            await modelo.activar(id);

            res.status(200).json({
                mensaje: 'Trabajador activado correctamente.',
                trabajador: {
                    idtrabajador: Number(id),
                    nombres: trabajador.nombres,
                    estado: 'Activo'
                }
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor: ' + err.message });
        }
    }
}

module.exports = ActivarTrabajadorControlador;