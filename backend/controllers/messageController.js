const Message = require('../models/Message');
const { sendAspirationNotification, sendDocumentRenewalNotification } = require('../utils/emailService');

// Create a new message (Public)
exports.createMessage = async (req, res) => {
  try {
    const { name, email, phone, category, message, faculty, documentType } = req.body;
    const newMessage = new Message({
      name,
      email,
      phone,
      category,
      message,
      faculty,
      documentType
    });
    const savedMessage = await newMessage.save();

    // Send email notification using Resend based on type
    if (category && category.toLowerCase().includes('perpanjang dokumen')) {
      await sendDocumentRenewalNotification(savedMessage);
    } else {
      await sendAspirationNotification(savedMessage);
    }

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating message', error: error.message });
  }
};

// Get all messages (Admin)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

// Update message read status (Admin)
exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;
    
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { isRead },
      { new: true }
    );
    
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating message', error: error.message });
  }
};

// Delete message (Admin)
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);
    
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};
