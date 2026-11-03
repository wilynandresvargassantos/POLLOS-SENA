const modelo = require('../../modelo/clientes/GestionPedidoModelo');

class GestionPedidoControlador {
    // CA-01: Cancelar Pedido
    static async cancelar(req, res) {
        const { idPedido } = req.params;

        if (!idPedido || isNaN(idPedido)) {
            return res.status(400).json({ error: 'El ID del pedido es obligatorio y numérico.' });
        }

        try {
            const pedido = await modelo.buscarPorId(idPedido);
            if (!pedido) {
                return res.status(404).json({ error: 'El pedido solicitado no existe.' });
            }

            if (pedido.estado === 'Cancelado') {
                return res.status(400).json({ error: 'El pedido ya se encuentra cancelado.' });
            }

            if (pedido.estado === 'Entregado') {
                return res.status(400).json({ error: 'No se puede cancelar un pedido que ya ha sido entregado.' });
            }

            await modelo.cancelarPedido(idPedido, pedido.idProducto, pedido.cantidadKg);

            res.status(200).json({
                mensaje: 'El pedido ha sido cancelado exitosamente y el stock ha sido reintegrado.',
                idPedido: Number(idPedido),
                estado: 'Cancelado',
                stockDevueltoKg: pedido.cantidadKg
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor: ' + err.message });
        }
    }

    // CA-02: Modificar Pedido
    static async modificar(req, res) {
        const { idPedido } = req.params;
        const { nuevaCantidadKg } = req.body;

        if (!idPedido || isNaN(idPedido)) {
            return res.status(400).json({ error: 'El ID del pedido es obligatorio y numérico.' });
        }

        if (!nuevaCantidadKg || isNaN(nuevaCantidadKg) || Number(nuevaCantidadKg) <= 0) {
            return res.status(400).json({ error: 'nuevaCantidadKg es obligatoria y debe ser mayor a cero.' });
        }

        try {
            const pedido = await modelo.buscarPorId(idPedido);
            if (!pedido) {
                return res.status(404).json({ error: 'El pedido a modificar no existe.' });
            }

            if (pedido.estado === 'Cancelado' || pedido.estado === 'Entregado') {
                return res.status(400).json({ error: `No se puede modificar un pedido en estado ${pedido.estado}.` });
            }

            const producto = await modelo.buscarProductoPorId(pedido.idProducto);
            if (!producto) {
                return res.status(404).json({ error: 'El producto asociado no existe.' });
            }

            const nuevaCant = Number(nuevaCantidadKg);
            const diferenciaKg = nuevaCant - Number(pedido.cantidadKg);

            // Validar si requiere más stock del disponible
            if (diferenciaKg > 0 && diferenciaKg > Number(producto.cantidadDisponible)) {
                return res.status(400).json({ 
                    error: `Stock insuficiente. Solo quedan ${producto.cantidadDisponible} kg disponibles para añadir.` 
                });
            }

            const nuevoTotal = (nuevaCant * Number(producto.precio)).toFixed(2);

            await modelo.modificarPedido(idPedido, pedido.idProducto, diferenciaKg, nuevaCant, nuevoTotal);

            res.status(200).json({
                mensaje: 'Pedido modificado exitosamente.',
                pedidoActualizado: {
                    idPedido: Number(idPedido),
                    idProducto: pedido.idProducto,
                    nuevaCantidadKg: nuevaCant,
                    nuevoTotal: Number(nuevoTotal),
                    estado: pedido.estado
                }
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor: ' + err.message });
        }
    }
}

module.exports = GestionPedidoControlador;