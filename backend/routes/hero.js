const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', heroController.getHeroSettings);
router.put('/', authMiddleware, upload.array('images', 4), heroController.updateHeroSettings);

module.exports = router;
