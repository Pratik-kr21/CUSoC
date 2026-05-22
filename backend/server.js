const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const applyRoutes = require('./routes/applyRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/apply', applyRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('CUSoC API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
