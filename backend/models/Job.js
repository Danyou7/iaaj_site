const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  salary: { type: String },
  experienceLevel: { type: String },
  deadline: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: [String], required: true },
  contactEmail: { type: String, required: true },
  posterImage: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Job', jobSchema);
