const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  grupo: {
    type: Number,
    required: true,
    enum: [1, 2],
  },
  horario: {
    type: String,
    required: true,
    enum: ['08:00-10:00', '10:00-12:00', '14:00-16:00', 'ninguno'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Estudiante', estudianteSchema);
