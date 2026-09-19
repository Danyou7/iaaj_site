require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const heroRoutes = require('./routes/hero');
const alumniRoutes = require('./routes/alumni');
const jobRoutes = require('./routes/job');
const newsRoutes = require('./routes/news');
const messageRoutes = require('./routes/message');
const aboutRoutes = require('./routes/about');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang di API IAAJ CMS Backend!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/settings/hero', heroRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/settings/about', aboutRoutes);

// Connect DB & Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
