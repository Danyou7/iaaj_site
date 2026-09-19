const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.post('/', authMiddleware, upload.single('thumbnailImage'), newsController.createNews);
router.put('/:id', authMiddleware, upload.single('thumbnailImage'), newsController.updateNews);
router.delete('/:id', authMiddleware, newsController.deleteNews);

module.exports = router;
