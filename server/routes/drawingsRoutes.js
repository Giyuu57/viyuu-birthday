const express = require('express');
const { getDrawings } = require('../controllers/drawingsController');

const router = express.Router();

router.get('/', getDrawings);

module.exports = router;
