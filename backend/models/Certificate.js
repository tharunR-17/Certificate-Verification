const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentName: String,
  courseName: String,
  issuedDate: String,
  grade: String,
  certHash: String
});

module.exports = mongoose.model('Certificate', certificateSchema);
