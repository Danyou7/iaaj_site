const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');
const authMiddleware = require('../middlewares/auth');

router.get('/', alumniController.getAllAlumni);
router.get('/:id', alumniController.getAlumniById);
router.post('/', alumniController.createAlumni);
router.put('/:id', authMiddleware, alumniController.updateAlumni);
router.delete('/:id', authMiddleware, alumniController.deleteAlumni);

module.exports = router;
