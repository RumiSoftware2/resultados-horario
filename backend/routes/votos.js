const express = require('express');
const router = express.Router();
const {
  obtenerEstudiantes,
  obtenerEstadisticasVotos,
  crearEstudiante,
} = require('../controllers/votosController');

// Obtener todos los estudiantes
router.get('/estudiantes', obtenerEstudiantes);

// Obtener estadísticas de votos
router.get('/estadisticas', obtenerEstadisticasVotos);

// Crear nuevo estudiante
router.post('/estudiantes', crearEstudiante);

module.exports = router;
