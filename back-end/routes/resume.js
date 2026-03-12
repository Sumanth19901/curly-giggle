const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const authMiddleware = require('../middleware/auth');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/resume/upload
router.post('/upload', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Mock successful upload for demo
    const mockResumeData = {
      id: 'demo-resume-' + Date.now(),
      user_id: req.user.id,
      resume_url: 'https://example.com/demo-resume.pdf',
      created_at: new Date().toISOString()
    };

    console.log('[DEMO] Resume upload bypassed storage bucket');
    res.status(201).json({ message: 'Resume uploaded successfully (Demo Mode)', resume: mockResumeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/resume/analyze
router.post('/analyze', authMiddleware, async (req, res) => {
  try {
    const { resumeId } = req.body;
    // Mock analysis logic for demo
    const analysis = {
      extracted_skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Redux'],
      strengths: ['Strong frontend experience with modern frameworks', 'Solid backend foundations', 'Excellent UI/UX awareness'],
      weaknesses: ['Missing Cloud experience (AWS/Azure)', 'Limited experience with Docker/Kubernetes'],
      score: 88
    };

    console.log('[DEMO] Resume analysis complete (Bypassed DB update)');
    res.status(200).json({ message: 'Analysis complete', analysis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
