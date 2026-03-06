const Estudiante = require('../models/Estudiante');

// Obtener todos los estudiantes
const obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      total: estudiantes.length,
      data: estudiantes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener estudiantes',
      detalles: err.message,
    });
  }
};

// Obtener estadísticas de votos
const obtenerEstadisticasVotos = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();

    if (estudiantes.length === 0) {
      return res.json({
        success: true,
        totalEstudiantes: 0,
        horariosMasVotados: [],
        conteoCompleto: {},
        mensaje: 'No hay datos disponibles',
      });
    }

    // Contar votos de cada horario
    const conteoHorarios = {};
    let totalVotos = 0;
    
    estudiantes.forEach((est) => {
      // Si schedules existe y es un array
      if (est.schedules && Array.isArray(est.schedules)) {
        est.schedules.forEach((horario) => {
          if (horario && horario !== 'ninguno') {
            conteoHorarios[horario] = (conteoHorarios[horario] || 0) + 1;
            totalVotos++;
          }
        });
      }
    });

    // Obtener los 2 más votados
    const horariosMasVotados = Object.entries(conteoHorarios)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([horario, votos]) => ({
        horario,
        votos,
      }));

    res.json({
      success: true,
      totalEstudiantes: estudiantes.length,
      totalVotos,
      horariosMasVotados,
      conteoCompleto: conteoHorarios,
      mensaje: 'Consulta realizada exitosamente',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error al consultar estadísticas',
      detalles: err.message,
    });
  }
};

// Crear nuevo estudiante
const crearEstudiante = async (req, res) => {
  try {
    const { nombre, correo, grupo, horario } = req.body;

    // Validar datos
    if (!nombre || !correo || !grupo || !horario) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos',
      });
    }

    const nuevoEstudiante = new Estudiante({
      nombre,
      correo,
      grupo,
      horario,
    });

    const estudiante = await nuevoEstudiante.save();
    res.status(201).json({
      success: true,
      mensaje: 'Estudiante creado exitosamente',
      data: estudiante,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error al crear estudiante',
      detalles: err.message,
    });
  }
};

module.exports = {
  obtenerEstudiantes,
  obtenerEstadisticasVotos,
  crearEstudiante,
};
