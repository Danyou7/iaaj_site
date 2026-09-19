const { HeroSetting } = require('../models');

// Get Hero Settings
const getHeroSettings = async (req, res) => {
  try {
    let settings = await HeroSetting.findOne({ identifier: 'main' });
    if (!settings) {
      settings = await HeroSetting.create({ identifier: 'main' });
    }
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

// Update Hero Settings
const updateHeroSettings = async (req, res) => {
  try {
    const { headline, subheadline } = req.body;
    
    // Process uploaded images
    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = req.files.map(file => `/uploads/${file.filename}`);
    }

    let settings = await HeroSetting.findOne({ identifier: 'main' });
    if (!settings) {
      settings = await HeroSetting.create({ identifier: 'main' });
    }

    // Merge old images with new if you want to keep them, or just replace
    // Here we'll just replace them if new images are uploaded
    const imagesToSave = newImages.length > 0 ? newImages : settings.images;

    settings.headline = headline || settings.headline;
    settings.subheadline = subheadline || settings.subheadline;
    settings.images = imagesToSave;

    await settings.save();

    res.json({ message: 'Pengaturan beranda berhasil diperbarui', settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = {
  getHeroSettings,
  updateHeroSettings
};
