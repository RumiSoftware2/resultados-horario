const mongoose = require('mongoose');
require('dotenv').config();
const Estudiante = require('./models/Estudiante');

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/monitoria');

// Datos de ejemplo
const datosEjemplo = [
  // Horario 08:00-10:00 (5 estudiantes)
  { nombre: 'Ana García', correo: 'ana@email.com', grupo: 1, horario: '08:00-10:00' },
  { nombre: 'Carlos López', correo: 'carlos@email.com', grupo: 1, horario: '08:00-10:00' },
  { nombre: 'María Ruiz', correo: 'maria@email.com', grupo: 2, horario: '08:00-10:00' },
  { nombre: 'Diego Martín', correo: 'diego@email.com', grupo: 1, horario: '08:00-10:00' },
  { nombre: 'Laura Sánchez', correo: 'laura@email.com', grupo: 2, horario: '08:00-10:00' },

  // Horario 10:00-12:00 (8 estudiantes) - MÁS VOTADO
  { nombre: 'Juan Pérez', correo: 'juan@email.com', grupo: 1, horario: '10:00-12:00' },
  { nombre: 'Elena Jiménez', correo: 'elena@email.com', grupo: 2, horario: '10:00-12:00' },
  { nombre: 'Roberto González', correo: 'roberto@email.com', grupo: 1, horario: '10:00-12:00' },
  { nombre: 'Patricia Díaz', correo: 'patricia@email.com', grupo: 2, horario: '10:00-12:00' },
  { nombre: 'Francisco Núñez', correo: 'francisco@email.com', grupo: 1, horario: '10:00-12:00' },
  { nombre: 'Victoria Romero', correo: 'victoria@email.com', grupo: 2, horario: '10:00-12:00' },
  { nombre: 'Miguel Herrera', correo: 'miguel@email.com', grupo: 1, horario: '10:00-12:00' },
  { nombre: 'Sandra Morales', correo: 'sandra@email.com', grupo: 2, horario: '10:00-12:00' },

  // Horario 14:00-16:00 (6 estudiantes)
  { nombre: 'Andrés Castillo', correo: 'andres@email.com', grupo: 1, horario: '14:00-16:00' },
  { nombre: 'Isabel Vega', correo: 'isabel@email.com', grupo: 2, horario: '14:00-16:00' },
  { nombre: 'Javier Flores', correo: 'javier@email.com', grupo: 1, horario: '14:00-16:00' },
  { nombre: 'Rosa Iglesias', correo: 'rosa@email.com', grupo: 2, horario: '14:00-16:00' },
  { nombre: 'Pablo Medina', correo: 'pablo@email.com', grupo: 1, horario: '14:00-16:00' },
  { nombre: 'Silvia Guerrero', correo: 'silvia@email.com', grupo: 2, horario: '14:00-16:00' },

  // Opción ninguno (3 estudiantes)
  { nombre: 'Óscar Ramos', correo: 'oscar@email.com', grupo: 1, horario: 'ninguno' },
  { nombre: 'Lucía Campos', correo: 'lucia@email.com', grupo: 2, horario: 'ninguno' },
  { nombre: 'Tomás Ramírez', correo: 'tomas@email.com', grupo: 1, horario: 'ninguno' },
];

async function insertarDatos() {
  try {
    // Limpiar colección existente
    await Estudiante.deleteMany({});
    console.log('Colección limpiada');

    // Insertar datos
    const resultado = await Estudiante.insertMany(datosEjemplo);
    console.log(`✓ Se insertaron ${resultado.length} estudiantes`);
    
    // Mostrar resumen
    console.log('\nResumen de datos insertados:');
    const conteo = {};
    datosEjemplo.forEach(est => {
      conteo[est.horario] = (conteo[est.horario] || 0) + 1;
    });
    Object.entries(conteo).forEach(([horario, count]) => {
      console.log(`  - ${horario}: ${count} estudiantes`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Error al insertar datos:', err);
    process.exit(1);
  }
}

insertarDatos();
