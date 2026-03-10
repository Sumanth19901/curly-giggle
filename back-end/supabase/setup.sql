-- ACIA Database Setup Script
-- Run this in your Supabase SQL Editor

-- 1. PROFILES: Stores student-specific data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  cgpa DECIMAL(3,2) DEFAULT 0.0,
  placement_score INTEGER DEFAULT 0,
  technical_score INTEGER DEFAULT 0,
  soft_skills_score INTEGER DEFAULT 0,
  projects_score INTEGER DEFAULT 0,
  target_role TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. RESUMES: Tracks uploaded resume files
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT,
  extracted_skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. USER_SKILLS: Detailed skill mapping per student
CREATE TABLE IF NOT EXISTS public.user_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  category TEXT, -- 'Technical' or 'Soft'
  proficiency INTEGER DEFAULT 50, -- 0-100
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. JOB_ROLES: Requirements for specific career paths
CREATE TABLE IF NOT EXISTS public.job_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role_name TEXT UNIQUE NOT NULL,
  required_skills JSONB NOT NULL, -- e.g. ["React", "Node.js"]
  description TEXT
);

-- 5. LEARNING_PATHS: Personalized roadmaps
CREATE TABLE IF NOT EXISTS public.learning_paths (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  phase_title TEXT NOT NULL,
  duration TEXT,
  is_completed BOOLEAN DEFAULT false,
  items JSONB NOT NULL, -- list of {name, resource, done}
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. INTERVIEW_QUESTIONS: Role-specific preparation data
CREATE TABLE IF NOT EXISTS public.interview_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL, -- 'Technical', 'Behavioral', etc.
  question TEXT NOT NULL,
  tip TEXT,
  role_id UUID REFERENCES public.job_roles(id)
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;

-- POLICIES: Ensure students only see their own data
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own resumes" ON public.resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own skills" ON public.user_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own learning paths" ON public.learning_paths FOR SELECT USING (auth.uid() = user_id);

-- SEED DATA: Common Job Roles
INSERT INTO public.job_roles (role_name, required_skills, description) VALUES
('Full Stack Developer', '["React.js", "Node.js", "MongoDB", "REST APIs", "TypeScript", "Docker", "Git", "SQL"]', 'Modern web application development'),
('Data Scientist', '["Python", "Machine Learning", "Deep Learning", "SQL", "Pandas", "TensorFlow", "Statistics"]', 'Data analysis and ML modeling'),
('Backend Developer', '["Django", "REST APIs", "SQL", "Docker", "Redis", "CI/CD", "Git"]', 'Server-side logic and database architecture')
ON CONFLICT (role_name) DO NOTHING;

-- TRIGGER: Automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
