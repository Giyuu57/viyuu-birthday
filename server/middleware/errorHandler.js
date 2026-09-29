// Centralized error handler. Any `next(err)` call in a route ends up here.
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: true,
    message: status === 500 ? 'Something went wrong on our end.' : err.message,
  });
}

function notFound(req, res) {
  res.status(404).json({ error: true, message: `Route not found: ${req.originalUrl}` });
}

module.exports = { errorHandler, notFound };
