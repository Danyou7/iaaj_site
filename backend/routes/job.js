const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post('/', upload.single('posterImage'), jobController.createJob);
router.put('/:id', authMiddleware, upload.single('posterImage'), jobController.updateJob);
router.delete('/:id', authMiddleware, jobController.deleteJob);

module.exports = router;
