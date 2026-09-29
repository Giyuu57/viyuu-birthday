const fs = require('fs');
const path = require('path');

const DRAWINGS_DIR = path.join(__dirname, '..', '..', 'client', 'public', 'assets', 'drawings');
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

// GET /api/drawings
// Scans client/public/assets/drawings and returns whatever image files are
// actually in there — no manual registration needed. Drop a file in, refresh,
// it shows up. Remove it, it disappears. Sorted naturally so drawing2 comes
// before drawing10.
function getDrawings(req, res) {
  try {
    if (!fs.existsSync(DRAWINGS_DIR)) {
      return res.json({ drawings: [] });
    }

    const files = fs
      .readdirSync(DRAWINGS_DIR)
      .filter((file) => ALLOWED_EXT.has(path.extname(file).toLowerCase()) && !file.startsWith('.'))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    const drawings = files.map((file, index) => ({
      id: index + 1,
      filename: file,
      url: `/assets/drawings/${file}`,
    }));

    return res.json({ drawings });
  } catch (err) {
    console.error('getDrawings error:', err.message);
    return res.status(500).json({ drawings: [], error: 'Could not read drawings folder.' });
  }
}

module.exports = { getDrawings };
