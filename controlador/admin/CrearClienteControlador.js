const modelo = require('../../modelo/admin/CrearClienteModelo');

class CrearClienteControlador {

    // Funcion para crear un nuevo cliente
    static async crearCliente(req, res) {
        const {t1: nom, t2: tipoD, t3: numeroD, t4: dir, t5: tel, t6: email, t7: contras} = req.body;

        // Validar campos vacios
        const errorCampos = CrearClienteControlador.verCampos(
            nom, tipoD, numeroD, dir, tel, email, contras
        );

        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }

        // Validar nombres completos
        const errornom = CrearClienteControlador.vernom(nom);
        if (errornom) {
            return res.status(400).json({ error: errornom });
        }

        // Validar tipo de documento
        const erortipoD = CrearClienteControlador.vertipoD(tipoD);
        if (erortipoD) {
            return res.status(400).json({ error: erortipoD });
        }

        // Validar numero de documento
        const erorIde = CrearClienteControlador.vernumerod(numeroD);
        if (erorIde) {
            return res.status(400).json({ error: erorIde });
        }

        // Validar direccion
        const errordir = CrearClienteControlador.verdir(dir);
        if (errordir) {
            return res.status(400).json({ error: errordir });
        }

        // Validar telefono
        const errortel = CrearClienteControlador.verTel(tel);
        if (errortel) {
            return res.status(400).json({ error: errortel });
        }

        // Validar correo
        const errorem = CrearClienteControlador.veremail(email);
        if (errorem) {
            return res.status(400).json({ error: errorem });
        }

        // Validar contraseña
        const errorkey = CrearClienteControlador.verkey(contras);
        if (errorkey) {
            return res.status(400).json({ error: errorkey });
        }

        // Crear cliente en la base de datos
        try {
            await modelo.crearClientes(nom, tipoD, numeroD, dir, tel, email, contras);
            return res.status(201).json({
                mensaje: 'Cliente creado correctamente.'
            });

        } catch (err) {
            console.error('Error al crear cliente:', err.message);

            return res.status(500).json({error: 'No fue posible crear el cliente.'});
        }
    }

    // Validar campos obligatorios
    static verCampos(nom, tipoD, numeroD, dir, tel, email, contras) {
        if (!nom || !tipoD || !numeroD ||!dir || !tel || !email || !contras) {
            return 'Todos los campos son obligatorios.';
        }
        return null;
    }

    // Validar nombres completos
    static vernom(nom) {
        const name = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
        if (!name.test(nom.trim())) {
            return 'Nombres y apellidos inválidos. Usa entre 3 y 100 caracteres, solo letras y espacios.';
        }
        return null;
    }

    // Validar tipo de documento
    static vertipoD(tipoD) {
        const tipD = /^(CC|TI|CE)$/;
        if (!tipD.test(tipoD)) {
            return 'Tipo de documento inválido. Usa CC, TI o CE.';
        }
        return null;
    }

    // Validar numero de documento
    static vernumerod(numeroD) {
        if (!/^\d{8,10}$/.test(numeroD)) {
            return 'La identificación debe tener entre 8 y 10 dígitos numéricos.';
        }
        return null;
    }

    // Validar direccion
    static verdir(dir) {
        const er = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s#.,°\-\/]+$/;
        if (
            typeof dir !== 'string' ||
            !er.test(dir) ||
            dir.length > 200 ||
            dir.trim().length === 0
        ) {
            return 'Dirección inválida. Ejemplo válido: Calle 10 # 20-30';
        }
        return null;
    }

    // Validar telefono
    static verTel(tel) {
        if (!/^\d{10}$/.test(tel)) {
            return 'El teléfono debe tener exactamente 10 dígitos numéricos.';
        }
        return null;
    }

    // Validar correo
    static veremail(email) {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!er.test(email) || email.length > 200) {
            return 'Correo inválido. Ejemplo válido: ejemplo@email.com';
        }
        return null;
    }

    // Validar contraseña
    static verkey(contras) {
        const key = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!key.test(contras)) {
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
        }
        return null;
    }
}

module.exports = CrearClienteControlador;