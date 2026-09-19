const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  thumbnailImage: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['berita', 'buletin'],
    default: 'berita',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('News', newsSchema);
