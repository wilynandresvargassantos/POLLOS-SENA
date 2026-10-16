const modelo = require('../../modelo/trabajador/LoginTrabajadorModelo');

class LoginTrabajadorControlador {
    static async login(req, res) {
        const { t1: correo, t2: contras } = req.body;

        // ------------ Validaciones ------------
        const errorCampos = LoginTrabajadorControlador.verCampos(correo, contras);
        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }

        const errorEmail = LoginTrabajadorControlador.verEmail(correo);
        if (errorEmail) {
            return res.status(400).json({ error: errorEmail });
        }

        try {
            // 1. Verificar existencia
            const trabajador = await modelo.buscarPorCorreo(correo);
            if (!trabajador) {
                return res.status(401).json({ error: 'Credenciales inválidas. Correo o contraseña incorrectos.' });
            }

            // 2. Verificar estado de la cuenta
            if (trabajador.estado !== 'Activo') {
                return res.status(403).json({ error: 'La cuenta no se encuentra habilitada para ingresar.' });
            }

            // 3. Verificar rol
            if (trabajador.rol !== 'Trabajador') {
                return res.status(403).json({ error: 'Acceso no autorizado para este módulo.' });
            }

            // 4. Verificar contraseña
            const esValida = await modelo.verificarContrasena(contras, trabajador.contrasena);
            if (!esValida) {
                return res.status(401).json({ error: 'Credenciales inválidas. Correo o contraseña incorrectos.' });
            }

            // Inicio de sesión exitoso
            res.status(200).json({
                mensaje: 'Inicio de sesión exitoso.',
                usuario: {
                    nombres: trabajador.nombres,
                    correo: trabajador.correo,
                    rol: trabajador.rol
                }
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error inesperado del servidor: ' + err.message });
        }
    }

    // Métodos de validación
    static verCampos(correo, contras) {
        if (!correo || !contras) {
            return 'Todos los campos son obligatorios.';
        }
        return null;
    }

    static verEmail(email) {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!er.test(email) || email.length > 250) {
            return 'Correo inválido. Ejemplo válido: trabajador@email.com';
        }
        return null;
    }
}

module.exports = LoginTrabajadorControlador;