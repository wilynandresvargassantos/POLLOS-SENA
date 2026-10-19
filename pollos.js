const express = require('express');
const cors = require('cors');

const RutasAdmin = require('./vista/admin/RutasAdmin');
const RutasClientes = require('./vista/clientes/RutasClientes');
const RutasTrabajadores = require('./vista/trabajadores/RutasTrabajadores');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas registradas
app.use('/', RutasAdmin);
app.use('/', RutasClientes);
app.use('/', RutasTrabajadores);

app.get('/', (req, res) => {
    res.send('API de Pollos funcionando correctamente');
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});