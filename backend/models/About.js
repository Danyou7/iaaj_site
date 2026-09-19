const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});

const aboutSchema = new mongoose.Schema({
  historyImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
  },
  members: [memberSchema],
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
