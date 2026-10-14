const modelo = require('../../modelo/cliente/RegistroClienteModelo');

class RegistroClienteControlador {
    // Función para registrar nuevo cliente desde su propia cuenta
    static async registrar(req, res) {
        const { t1: numeroD, t2: nom, t3: tel, t4: email, t5: contras } = req.body;

        // ------------👁️‍🗨️ Validaciones👁️‍🗨️----------------
        // 1. Validar campos vacíos
        const errorCampos = RegistroClienteControlador.verCampos(numeroD, nom, tel, email, contras);
        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }

        // 2. Validar documento (entre 8 y 10 dígitos)
        const errorIde = RegistroClienteControlador.verIde(numeroD);
        if (errorIde) {
            return res.status(400).json({ error: errorIde });
        }

        // 3. Validar nombres completos
        const errorNom = RegistroClienteControlador.verNom(nom);
        if (errorNom) {
            return res.status(400).json({ error: errorNom });
        }

        // 4. Validar teléfono (exactamente 10 dígitos)
        const errorTel = RegistroClienteControlador.verTel(tel);
        if (errorTel) {
            return res.status(400).json({ error: errorTel });
        }

        // 5. Validar correo electrónico
        const errorEmail = RegistroClienteControlador.verEmail(email);
        if (errorEmail) {
            return res.status(400).json({ error: errorEmail });
        }

        // 6. Validar contraseña segura
        const errorKey = RegistroClienteControlador.verKey(contras);
        if (errorKey) {
            return res.status(400).json({ error: errorKey });
        }

        // Guardar en la base de datos
        try {
            const result = await modelo.registrarCliente(numeroD, nom, tel, email, contras);
            res.status(201).json({ 
                mensaje: 'Cuenta creada con éxito.', 
                id: result.insertId 
            });
        } catch (err) {
            if (err.message.includes("Duplicate entry")) {
                return res.status(409).json({ 
                    error: 'Ya existe una cuenta con este documento, teléfono o correo.',
                    sugerencia: 'Inicia sesión o intenta recuperar tu contraseña.' 
                });
            } else {
                return res.status(500).json({ error: 'Error inesperado: ' + err.message });
            }
        }
    }

    // ------------------- Métodos de Validación -------------------
    static verCampos(numeroD, nom, tel, email, contras) {
        if (!numeroD || !nom || !tel || !email || !contras) {
            return 'Todos los campos son obligatorios.';
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

    static verTel(tel) {
        if (!/^\d{10}$/.test(tel)) {
            return 'El teléfono debe tener exactamente 10 dígitos numéricos.';
        }
        return null;
    }

    static verEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || email.length > 200) {
            return 'Correo inválido. Debe cumplir con el formato ejemplo@email.com y máximo 200 caracteres.';
        }
        return null;
    }

    static verKey(contras) {
        const keyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!keyRegex.test(contras)) {
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
        }
        return null;
    }
}

module.exports = RegistroClienteControlador;