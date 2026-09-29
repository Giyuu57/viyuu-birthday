const mongoose = require('mongoose');

/**
 * Connects to MongoDB if MONGO_URI is set.
 * The site is designed to work perfectly fine WITHOUT a database too —
 * content and drawings fall back to sane defaults / the filesystem.
 * This means `npm run dev` works immediately, even before you set up Mongo.
 */
async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log('ℹ️  No MONGO_URI set — running without a database (this is fine).');
    return false;
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
    return true;
  } catch (err) {
    console.warn('⚠️  Could not connect to MongoDB, continuing without it:', err.message);
    return false;
  }
}

module.exports = connectDB;
