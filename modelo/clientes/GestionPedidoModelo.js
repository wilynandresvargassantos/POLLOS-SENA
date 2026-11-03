const dbService = require('../bd/Conexion');

class GestionPedidoModelo {
    // Buscar pedido por ID
    static async buscarPorId(idPedido) {
        const query = 'SELECT * FROM pedidos WHERE idPedido = ?';
        try {
            const filas = await dbService.query(query, [idPedido]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar pedido: ${err.message}`);
        }
    }

    // Buscar producto por ID para validar stock y precio
    static async buscarProductoPorId(idProducto) {
        const query = 'SELECT * FROM productos WHERE idProducto = ?';
        try {
            const filas = await dbService.query(query, [idProducto]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar producto: ${err.message}`);
        }
    }

    // Cancelar pedido: estado = 'Cancelado' y reingresar stock a cantidadDisponible
    static async cancelarPedido(idPedido, idProducto, cantidadKg) {
        const queryPedido = "UPDATE pedidos SET estado = 'Cancelado' WHERE idPedido = ?";
        const queryStock = "UPDATE productos SET cantidadDisponible = cantidadDisponible + ? WHERE idProducto = ?";

        try {
            await dbService.query(queryPedido, [idPedido]);
            await dbService.query(queryStock, [cantidadKg, idProducto]);
            return true;
        } catch (err) {
            throw new Error(`Error al cancelar pedido: ${err.message}`);
        }
    }

    // Modificar pedido: actualizar cantidad en kg, total y ajustar stock de producto
    static async modificarPedido(idPedido, idProducto, diferenciaKg, nuevaCantidadKg, nuevoTotal) {
        // Si diferenciaKg > 0 el cliente pide más (resta stock), si es < 0 pide menos (devuelve stock)
        const queryStock = "UPDATE productos SET cantidadDisponible = cantidadDisponible - ? WHERE idProducto = ?";
        const queryPedido = "UPDATE pedidos SET cantidadKg = ?, total = ? WHERE idPedido = ?";

        try {
            await dbService.query(queryStock, [diferenciaKg, idProducto]);
            await dbService.query(queryPedido, [nuevaCantidadKg, nuevoTotal, idPedido]);
            return true;
        } catch (err) {
            throw new Error(`Error al modificar pedido: ${err.message}`);
        }
    }
}

module.exports = GestionPedidoModelo;