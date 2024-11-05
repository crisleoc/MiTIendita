// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Error de conexión:', err));

// Rutas
const productosRoutes = require('./backend/routes/products');
const proveedoresRoutes = require('./backend/routes/providers');

app.use('/api/products', productosRoutes);
app.use('/api/providers', proveedoresRoutes);
app.use(express.static(path.join(__dirname, './frontend')));

// Ruta principal que responde con index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});