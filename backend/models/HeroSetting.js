const mongoose = require('mongoose');

const heroSettingSchema = new mongoose.Schema({
  // Mongoose automatically adds _id.
  // We'll just enforce a single document via logic or a fixed field.
  identifier: {
    type: String,
    default: 'main',
    unique: true
  },
  headline: {
    type: String,
    required: true,
    default: 'Sinergi Alumni untuk Almamater dan Bangsa',
  },
  subheadline: {
    type: String,
    required: true,
    default: 'Selamat datang di portal resmi Ikatan Alumni Aman Jaya.',
  },
  images: {
    type: [String],
    default: []
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('HeroSetting', heroSettingSchema);
