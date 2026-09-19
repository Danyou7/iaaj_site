const { Job } = require('../models');

// Create Job
const createJob = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.posterImage = `/uploads/${req.file.filename}`;
    }

    if (data.requirements && typeof data.requirements === 'string') {
      try {
        data.requirements = JSON.parse(data.requirements);
      } catch (e) {
        data.requirements = [data.requirements];
      }
    }

    const job = await Job.create(data);
    res.status(201).json({ message: 'Loker berhasil ditambahkan', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menambah loker.' });
  }
};

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data loker.' });
  }
};

// Get Job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Loker tidak ditemukan.' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data loker.' });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.posterImage = `/uploads/${req.file.filename}`;
    }

    if (data.requirements && typeof data.requirements === 'string') {
      try {
        data.requirements = JSON.parse(data.requirements);
      } catch (e) {
        data.requirements = [data.requirements];
      }
    }

    const job = await Job.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!job) return res.status(404).json({ message: 'Loker tidak ditemukan.' });
    
    res.json({ message: 'Loker berhasil diperbarui', job });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui loker.' });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Loker tidak ditemukan.' });
    
    res.json({ message: 'Loker berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus loker.' });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
};
