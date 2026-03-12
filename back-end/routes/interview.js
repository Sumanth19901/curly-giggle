const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const authMiddleware = require('../middleware/auth');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// GET /api/interview/questions
router.get('/questions', authMiddleware, async (req, res) => {
  const { role } = req.query;
  try {
    const questions = [
      { id: 1, text: 'Explain the Virtual DOM in React.' },
      { id: 2, text: 'What is middleware in Express?' },
      { id: 3, text: 'How do you handle authentication in a distributed system?' },
      { id: 4, text: 'What are the benefits of using TypeScript over JavaScript?' },
      { id: 5, text: 'Explain the difference between SQL and NoSQL databases.' },
    ];

    // Return mock data immediately for demo
    res.status(200).json({ interviewId: 'demo-interview-123', questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/interview/evaluate
router.post('/evaluate', authMiddleware, async (req, res) => {
  const { interviewId, answers } = req.body;
  try {
    // Mock evaluation for demo
    const feedback = {
      overall_score: 85,
      comments: 'Excellent performance! You have a strong grasp of both frontend and backend concepts. Your explanation of system design was particularly impressive.',
      detailed_feedback: [
        { questionId: 1, score: 9, comment: 'Clear and concise explanation of the reconciliation process.' },
        { questionId: 2, score: 8, comment: 'Good understanding of the request-response cycle.' },
        { questionId: 3, score: 8, comment: 'Solid architectural knowledge.' },
      ]
    };

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
