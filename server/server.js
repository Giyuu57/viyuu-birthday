require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const contentRoutes = require('./routes/contentRoutes');
const drawingsRoutes = require('./routes/drawingsRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// Serve the personal assets (letter + drawings + music) directly, so the
// frontend can also just use plain <img>/<audio> tags against /assets/...
// without going through the API if it wants to.
app.use('/assets', express.static(path.join(__dirname, '..', 'client', 'public', 'assets')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use('/api/content', contentRoutes);
app.use('/api/drawings', drawingsRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await connectDB(); // resolves false and continues if no MONGO_URI — site still works
  app.listen(PORT, () => {
    console.log(`💗 Viyuu's birthday API running on http://localhost:${PORT}`);
  });
}

start();
