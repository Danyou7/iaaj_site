const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', aboutController.getAboutSettings);

// Accept 'historyImage' and 'memberImage_x'
router.put('/', authMiddleware, upload.any(), aboutController.updateAboutSettings);

module.exports = router;
