-- 📊 Websuem Web Platform SQL Schema
-- Domain: Agency Operations, CRM, Client Portal

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profiles Table (Linked to Supabase Auth Users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Clients Table (Detailed agency-specific info)
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  company_name TEXT NOT NULL,
  website_url TEXT,
  onboarding_status TEXT DEFAULT 'pending' CHECK (onboarding_status IN ('pending', 'active', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Leads Table (Marketing-to-Sales funnel)
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service_interest TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed_won', 'closed_lost')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Projects Table (Client project tracking)
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'discovery' CHECK (status IN ('discovery', 'design', 'build', 'review', 'launch', 'completed')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  last_update TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Invoices Table (Financial tracking)
CREATE TABLE invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL UNIQUE,
  amount DECIMAL(12,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue', 'cancelled')),
  due_date DATE NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Deliverables Table (Portal assets)
CREATE TABLE deliverables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'Design', 'PDF', 'URL', 'Code'
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 🛡️ Row Level Security (RLS) Configuration

-- Enable RLS for all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;

-- 📩 Leads: Allow public (anonymous) inserts for contact form submissions
CREATE POLICY "Allow public lead inserts" ON leads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 👤 Profiles: Users can only see their own profile
CREATE POLICY "Profiles are viewable by users who own them." ON profiles
  FOR SELECT USING (auth.uid() = id);

-- 🐝 Admin: Full global read access
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
  RETURN user_role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Admins can see everything." ON profiles FOR ALL USING (public.is_admin());

-- 📈 Projects: Clients can only see their own projects
CREATE POLICY "Clients can view their own projects." ON projects
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM clients WHERE id = projects.client_id AND profile_id = auth.uid())
  );

-- 💰 Invoices: Clients can only see their own invoices
CREATE POLICY "Clients can view their own invoices." ON invoices
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      JOIN clients ON projects.client_id = clients.id 
      WHERE projects.id = invoices.project_id AND clients.profile_id = auth.uid()
    )
  );

-- 📂 Deliverables: Clients can only see deliverables for their projects
CREATE POLICY "Clients can view their own deliverables." ON deliverables
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      JOIN clients ON projects.client_id = clients.id 
      WHERE projects.id = deliverables.project_id AND clients.profile_id = auth.uid()
    )
  );

-- 🤖 Profile Creation Trigger
-- Automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'client');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
