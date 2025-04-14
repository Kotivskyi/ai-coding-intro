const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/v1/health
 * @desc    Check API health status
 * @access  Public
 */
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

module.exports = router; 