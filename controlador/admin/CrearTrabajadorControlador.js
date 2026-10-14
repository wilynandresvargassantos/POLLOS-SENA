const modelo = require('../../modelo/admin/CrearTrabajadorModelo');

class CrearTrabajadorControlador {
    static async crear(req, res) {
        const { t1: tipoD, t2: numeroD, t3: nom, t4: dir, t5: tel, t6: email, t7: contras } = req.body;

        // ------------ Validaciones ------------
        const errorCampos = CrearTrabajadorControlador.verCampos(tipoD, numeroD, nom, dir, tel, email, contras);
        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }

        const errorTipoD = CrearTrabajadorControlador.verTipoD(tipoD);
        if (errorTipoD) {
            return res.status(400).json({ error: errorTipoD });
        }

        const errorIde = CrearTrabajadorControlador.verIde(numeroD);
        if (errorIde) {
            return res.status(400).json({ error: errorIde });
        }

        const errorNom = CrearTrabajadorControlador.verNom(nom);
        if (errorNom) {
            return res.status(400).json({ error: errorNom });
        }

        const errorDir = CrearTrabajadorControlador.verDir(dir);
        if (errorDir) {
            return res.status(400).json({ error: errorDir });
        }

        const errorTel = CrearTrabajadorControlador.verTel(tel);
        if (errorTel) {
            return res.status(400).json({ error: errorTel });
        }

        const errorEmail = CrearTrabajadorControlador.verEmail(email);
        if (errorEmail) {
            return res.status(400).json({ error: errorEmail });
        }

        const errorKey = CrearTrabajadorControlador.verKey(contras);
        if (errorKey) {
            return res.status(400).json({ error: errorKey });
        }

        try {
            const result = await modelo.crearTrabajador(tipoD, numeroD, nom, dir, tel, email, contras);
            res.status(201).json({ 
                mensaje: 'Trabajador creado con éxito.', 
                id: result.insertId 
            });
        } catch (err) {
            if (err.message.includes("Duplicate entry")) {
                return res.status(409).json({ 
                    error: 'Ya existe un trabajador con este documento, teléfono o correo.' 
                });
            } else {
                return res.status(500).json({ error: 'Error inesperado del servidor: ' + err.message });
            }
        }
    }

    // Métodos de validación
    static verCampos(tipoD, numeroD, nom, dir, tel, email, contras) {
        if (!tipoD || !numeroD || !nom || !dir || !tel || !email || !contras) {
            return 'Todos los campos son obligatorios.';
        }
        return null;
    }

    static verTipoD(tipoD) {
        const tip = /^[A-Z\s]{2,3}$/;
        if (!tip.test(tipoD)) {
            return 'Tipo de documento inválido. Mínimo 2 y máximo 3 caracteres (ejemplo: CC, TI, CE).';
        }
        return null;
    }

    static verIde(numeroD) {
        if (!/^\d{8,10}$/.test(numeroD)) {
            return 'La identificación debe tener entre 8 y 10 dígitos numéricos.';
        }
        return null;
    }

    static verNom(nom) {
        const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
        if (!nameRegex.test(nom)) {
            return 'Nombres inválidos. Mínimo 3 caracteres, máximo 100, solo letras.';
        }
        return null;
    }

    static verDir(dir) {
        const dirRegex = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,#\/ºª\-]{5,200}$/;
        if (!dirRegex.test(dir)) {
            return 'Dirección inválida. Mínimo 5 caracteres y máximo 200.';
        }
        return null;
    }

    static verTel(tel) {
        if (!/^\d{10}$/.test(tel)) {
            return 'El teléfono debe tener exactamente 10 dígitos numéricos.';
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

    static verKey(contras) {
        const key = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!key.test(contras)) {
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.';
        }
        return null;
    }
}

module.exports = CrearTrabajadorControlador;