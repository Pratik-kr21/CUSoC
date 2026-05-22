const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // If running without ENV variables for now, use a local MongoDB connection or test connection
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cusoc_dev';
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
