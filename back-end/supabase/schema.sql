-- ACIA Database Schema

-- Users Table (Extend Supabase Auth)
-- Note: Supabase Auth already handles users, but we can have a public profiles/users table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resumes Table
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  resume_url TEXT,
  extracted_skills JSONB,
  analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills Table (Master list of skills)
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_name TEXT UNIQUE,
  category TEXT
);

-- Roadmaps Table
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  target_role TEXT,
  roadmap_steps JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Interviews Table
CREATE TABLE IF NOT EXISTS public.interviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  role TEXT,
  questions JSONB,
  feedback JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Placements Table
CREATE TABLE IF NOT EXISTS public.placements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  readiness_score INTEGER,
  predicted_companies JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- OTP Store (Temporary table for OTPs if not using Supabase's built-in OTP)
CREATE TABLE IF NOT EXISTS public.otp_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  otp_code TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies (Basic setup)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placements ENABLE ROW LEVEL SECURITY;

-- Simple policies (Owner can access their own data)
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own resumes" ON public.resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own resumes" ON public.resumes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own roadmaps" ON public.roadmaps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own roadmaps" ON public.roadmaps FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own interviews" ON public.interviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own interviews" ON public.interviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own placements" ON public.placements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own placements" ON public.placements FOR INSERT WITH CHECK (auth.uid() = user_id);
