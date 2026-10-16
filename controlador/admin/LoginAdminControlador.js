const modelo = require('../../modelo/admin/LoginAdminModelo');

class LoginAdminControlador {
    static async login(req, res) {
        const { t1: correo, t2: contras } = req.body;

        const errorCampos = LoginAdminControlador.verCampos(correo, contras);
        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }

        const errorEmail = LoginAdminControlador.verEmail(correo);
        if (errorEmail) {
            return res.status(400).json({ error: errorEmail });
        }

        try {
            const admin = await modelo.buscarPorCorreo(correo);
            if (!admin) {
                return res.status(401).json({ error: 'Credenciales inválidas. Correo o contraseña incorrectos.' });
            }

            if (admin.estado !== 'Activo') {
                return res.status(403).json({ error: 'La cuenta de administrador se encuentra inactiva.' });
            }

            if (admin.rol !== 'Admin') {
                return res.status(403).json({ error: 'Acceso denegado: no posee privilegios de administrador.' });
            }

            const esValida = await modelo.verificarContrasena(contras, admin.contrasena);
            if (!esValida) {
                return res.status(401).json({ error: 'Credenciales inválidas. Correo o contraseña incorrectos.' });
            }

            res.status(200).json({
                mensaje: 'Inicio de sesión exitoso como Administrador.',
                usuario: {
                    nombres: admin.nombres,
                    correo: admin.correo,
                    rol: admin.rol
                }
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error inesperado del servidor: ' + err.message });
        }
    }

    static verCampos(correo, contras) {
        if (!correo || !contras) {
            return 'Todos los campos son obligatorios.';
        }
        return null;
    }

    static verEmail(email) {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!er.test(email) || email.length > 250) {
            return 'Correo inválido. Ejemplo: admin@pollos.com';
        }
        return null;
    }
}

module.exports = LoginAdminControlador;