const { News } = require('../models');

// Create News
const createNews = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.thumbnailImage = `/uploads/${req.file.filename}`;
    }
    const news = await News.create(data);
    res.status(201).json({ message: 'Berita berhasil diterbitkan', news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menerbitkan berita.' });
  }
};

// Get All News
const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedDate: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data berita.' });
  }
};

// Get News by ID
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'Berita tidak ditemukan.' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data berita.' });
  }
};

// Update News
const updateNews = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.thumbnailImage = `/uploads/${req.file.filename}`;
    }

    const news = await News.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!news) return res.status(404).json({ message: 'Berita tidak ditemukan.' });
    
    res.json({ message: 'Berita berhasil diperbarui', news });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui berita.' });
  }
};

// Delete News
const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: 'Berita tidak ditemukan.' });
    
    res.json({ message: 'Berita berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus berita.' });
  }
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews
};
