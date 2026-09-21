const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', heroController.getHeroSettings);
router.put('/', authMiddleware, upload.fields([
  { name: 'images', maxCount: 4 },
  { name: 'aboutImage', maxCount: 1 },
  { name: 'careerImage', maxCount: 1 }
]), heroController.updateHeroSettings);

module.exports = router;
