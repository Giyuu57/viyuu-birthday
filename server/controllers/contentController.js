const mongoose = require('mongoose');
const SiteContent = require('../models/SiteContent');
const defaultContent = require('../data/defaultContent');

// GET /api/content
async function getContent(req, res) {
  try {
    if (mongoose.connection.readyState === 1) {
      const doc = await SiteContent.findOne({ key: 'default' }).lean();
      if (doc) {
        const { _id, __v, key, createdAt, updatedAt, ...content } = doc;
        return res.json({ source: 'database', content });
      }
    }
    return res.json({ source: 'default', content: defaultContent });
  } catch (err) {
    console.error('getContent error:', err.message);
    // Never let a DB hiccup break the birthday website.
    return res.json({ source: 'default-fallback', content: defaultContent });
  }
}

module.exports = { getContent };
