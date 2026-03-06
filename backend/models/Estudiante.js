const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  group: {
    type: Number,
    required: false,
  },
  schedules: {
    type: [String],
    required: false,
    default: [],
  },
}, { strict: false });

module.exports = mongoose.model('Estudiante', estudianteSchema, 'students');
