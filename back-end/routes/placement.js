const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const authMiddleware = require('../middleware/auth');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// GET /api/placement/predict
router.get('/predict', authMiddleware, async (req, res) => {
  try {
    // Mock placement prediction for demo
    const prediction = {
      readiness_score: 82,
      predicted_companies: [
        { name: 'Google', probability: '65%' },
        { name: 'Amazon', probability: '75%' },
        { name: 'Meta', probability: '60%' },
        { name: 'Startups', probability: '95%' }
      ]
    };

    // Return mock data immediately to avoid DB errors during demo
    res.status(200).json({ prediction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
