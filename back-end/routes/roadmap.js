const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const authMiddleware = require('../middleware/auth');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// GET /api/roadmap/generate
router.get('/generate', authMiddleware, async (req, res) => {
  const { targetRole } = req.query;
  try {
    // Mock roadmap generation for demo
    const roadmapSteps = [
      { id: 1, title: 'Master TypeScript Foundations', description: 'Deep dive into static typing, interfaces, and generics.', status: 'completed' },
      { id: 2, title: 'Advanced React Patterns', description: 'Hooks, Higher-Order Components, and Render Props.', status: 'in-progress' },
      { id: 3, title: 'Backend Mastery (Node/Express)', description: 'Building secure and scalable RESTful APIs.', status: 'pending' },
      { id: 4, title: 'Cloud Integration (AWS/Vercel)', description: 'Deploying applications and managing CI/CD pipelines.', status: 'pending' },
      { id: 5, title: 'Database Optimization', description: 'Advanced SQL queries and indexing strategies.', status: 'pending' },
    ];

    res.status(200).json({ 
      roadmap: {
        id: 'demo-roadmap-123',
        target_role: targetRole || 'Full Stack Engineer',
        roadmap_steps: roadmapSteps
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
