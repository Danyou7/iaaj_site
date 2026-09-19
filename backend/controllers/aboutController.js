const About = require('../models/About');
const path = require('path');
const fs = require('fs');

exports.getAboutSettings = async (req, res) => {
  try {
    let settings = await About.findOne();
    if (!settings) {
      settings = await About.create({
        historyImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
        members: []
      });
    }
    res.json(settings);
  } catch (error) {
    console.error('Error fetching about settings:', error);
    res.status(500).json({ message: 'Failed to fetch about settings' });
  }
};

exports.updateAboutSettings = async (req, res) => {
  console.log('Received PUT request to /api/settings/about');
  try {
    let settings = await About.findOne();
    if (!settings) {
      settings = await About.create({
        historyImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
        members: []
      });
    }

    const updates = {};
    if (req.body.members) {
      try {
        updates.members = JSON.parse(req.body.members);
      } catch (e) {
        updates.members = req.body.members; // in case it's already an array
      }
    }

    if (req.files && req.files.length > 0) {
      // Find history image
      const historyFile = req.files.find(f => f.fieldname === 'historyImage');
      if (historyFile) {
        updates.historyImage = `/uploads/${historyFile.filename}`;
      }

      // Handle member images
      if (updates.members) {
        updates.members = updates.members.map((member, index) => {
          const memberFile = req.files.find(f => f.fieldname === `memberImage_${index}`);
          if (memberFile) {
            return { ...member, image: `/uploads/${memberFile.filename}` };
          }
          return member;
        });
      }
    }

    const updatedSettings = await About.findOneAndUpdate(
      {},
      { $set: updates },
      { new: true, upsert: true }
    );

    res.json(updatedSettings);
  } catch (error) {
    console.error('Error updating about settings:', error);
    res.status(500).json({ message: 'Failed to update about settings' });
  }
};
