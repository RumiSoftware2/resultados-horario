const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const votosRoutes = require('./routes/votos');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/monitoria')
.then(() => console.log('✓ MongoDB conectado'))
.catch(err => console.error('✗ Error al conectar a MongoDB:', err));

// Rutas
app.use('/api', votosRoutes);

// Endpoint de prueba
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    mensaje: 'Backend funcionando correctamente' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Servidor ejecutándose en puerto ${PORT}`);
});

