const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// In-memory store for OTPs to avoid Supabase table dependency for demo
const otpStore = new Map();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Try to create profile, but don't fail if table doesn't exist
    try {
      await supabase
        .from('profiles')
        .insert({ id: authData.user.id, email, name });
    } catch (e) {
      console.log('Profiles table missing, skipping profile creation for demo');
    }

    res.status(201).json({ message: 'User registered successfully', user: authData.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Special bypass for demo admin
  const normalizedEmail = email?.toLowerCase().trim();
  const normalizedPassword = password?.trim();

  console.log(`Login attempt: ${normalizedEmail}`);

  const isDemoAdmin = (normalizedEmail === 'admin@demo.acia' && normalizedPassword === 'admin_password_2026') || 
                     (normalizedEmail === 'kasisumanth8@gmail.com' && normalizedPassword === 'admin_password_2026');

  if (isDemoAdmin) {
    console.log('Demo Admin login detected!');
    const adminUser = {
      id: 'demo-admin-id-123',
      email: normalizedEmail,
      user_metadata: { full_name: 'Demo Admin' }
    };
    const token = jwt.sign({ id: adminUser.id, email: adminUser.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.status(200).json({ 
      token, 
      user: adminUser, 
      session: { access_token: token, user: adminUser } 
    });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const token = jwt.sign({ id: data.user.id, email: data.user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ token, user: data.user, session: data.session });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    // Store OTP in memory instead of Supabase table to avoid "table not found" error
    otpStore.set(email, {
      code: otp,
      expiry: Date.now() + 10 * 60 * 1000
    });

    // Log the OTP to console so you can see it if email fails
    console.log(`[DEMO] OTP for ${email}: ${otp}`);

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your ACIA OTP Code',
      text: `Your OTP is: ${otp}`,
      html: `<b>Your OTP is: ${otp}</b>`,
    }).catch(e => console.log('Email send failed (SMTP not configured), but OTP is stored in memory. Code:', otp));

    res.status(200).json({ message: 'OTP sent successfully (Check console if email fails)' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const stored = otpStore.get(email);

    if (!stored || stored.code !== otp || Date.now() > stored.expiry) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Clear OTP after use
    otpStore.delete(email);

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
