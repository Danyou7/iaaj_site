const { Alumni } = require('../models');
const { sendAlumniNotification } = require('../utils/emailService');

// Create Alumni
const createAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.create(req.body);

    // Send email notification using Resend
    await sendAlumniNotification(alumni);

    res.status(201).json({ message: 'Data alumni berhasil ditambahkan', alumni });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menambah data alumni.' });
  }
};

// Get All Alumni
const getAllAlumni = async (req, res) => {
  try {
    let filter = {};
    if (req.query.status === 'approved') {
      filter = { $or: [{ status: 'approved' }, { status: { $exists: false } }] };
    } else if (req.query.status) {
      filter = { status: req.query.status };
    }
    const alumni = await Alumni.find(filter).sort({ createdAt: -1 });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data alumni.' });
  }
};

// Get Alumni by ID
const getAlumniById = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    if (!alumni) return res.status(404).json({ message: 'Data alumni tidak ditemukan.' });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data alumni.' });
  }
};

// Update Alumni
const updateAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alumni) return res.status(404).json({ message: 'Data alumni tidak ditemukan.' });
    
    res.json({ message: 'Data alumni berhasil diperbarui', alumni });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui data alumni.' });
  }
};

// Delete Alumni
const deleteAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndDelete(req.params.id);
    if (!alumni) return res.status(404).json({ message: 'Data alumni tidak ditemukan.' });
    
    res.json({ message: 'Data alumni berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus data alumni.' });
  }
};

module.exports = {
  createAlumni,
  getAllAlumni,
  getAlumniById,
  updateAlumni,
  deleteAlumni
};
