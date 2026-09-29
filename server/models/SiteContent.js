const mongoose = require('mongoose');

/**
 * Optional persisted override for the site's text content.
 * If no document exists in the database, the API simply returns the
 * default content shipped in the codebase (see controllers/contentController.js).
 * This lets the content evolve later (e.g. an admin panel) without ever
 * requiring the database to exist for the site to work today.
 */
const LoveCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  { _id: false }
);

const SiteContentSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'default', unique: true },
    name: String,
    hero: {
      greeting: String,
      subtitle: String,
      cta: String,
    },
    birthday: {
      title: String,
      candleHint: String,
      wish: String,
      wishFollowUp: String,
    },
    loveJourney: [String],
    loveCards: [LoveCardSchema],
    letter: {
      title: String,
      subtitle: String,
      hint: String,
    },
    gallery: {
      title: String,
      hint: String,
    },
    loveMeter: {
      title: String,
      overflowTitle: String,
      overflowMessage: String,
    },
    secret: {
      foundTitle: String,
      messageLines: [String],
    },
    finale: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteContent', SiteContentSchema);
