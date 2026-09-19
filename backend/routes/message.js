const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middlewares/auth');

// Public route for submitting messages/forms
router.post('/', messageController.createMessage);

// Admin routes for managing messages
router.get('/', authMiddleware, messageController.getMessages);
router.put('/:id', authMiddleware, messageController.updateMessage);
router.delete('/:id', authMiddleware, messageController.deleteMessage);

module.exports = router;
