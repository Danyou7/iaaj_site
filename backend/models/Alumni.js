const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  graduationYear: {
    type: Number,
  },
  currentRole: {
    type: String,
  },
  company: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Alumni', alumniSchema);
