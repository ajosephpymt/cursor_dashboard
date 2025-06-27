const express = require('express');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// JWT middleware to protect routes
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

router.get('/cursor/members', requireAuth, async (req, res) => {
  try {
    const apiKey = process.env.CURSOR_API_KEY;
    const authHeader = 'Basic ' + Buffer.from(apiKey + ':').toString('base64');
    const response = await fetch('https://api.cursor.com/teams/members', {
      headers: { Authorization: authHeader }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

router.post('/cursor/usage', requireAuth, async (req, res) => {
  try {
    const apiKey = process.env.CURSOR_API_KEY;
    const authHeader = 'Basic ' + Buffer.from(apiKey + ':').toString('base64');
    const { startDate, endDate } = req.body;
    const response = await fetch('https://api.cursor.com/teams/daily-usage-data', {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ startDate, endDate })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch usage data' });
  }
});

module.exports = router;
