-- Row Level Security Policies
-- This migration sets up proper RLS for all CRM tables

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DROP EXISTING POLICIES (Clean slate)
-- ============================================

DROP POLICY IF EXISTS "Allow public insert leads" ON leads;
DROP POLICY IF EXISTS "Allow public read leads" ON leads;
DROP POLICY IF EXISTS "Allow public read bookings" ON bookings;

-- ============================================
-- LEADS POLICIES
-- ============================================

-- Public can insert leads (contact form)
CREATE POLICY "Public can insert leads"
  ON leads FOR INSERT
  TO public
  WITH CHECK (true);

-- Authenticated users can view all leads
CREATE POLICY "Authenticated users can view leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can update leads
CREATE POLICY "Authenticated users can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete leads
CREATE POLICY "Authenticated users can delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- BOOKINGS POLICIES
-- ============================================

-- Authenticated users can view all bookings
CREATE POLICY "Authenticated users can view bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can create bookings
CREATE POLICY "Authenticated users can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update bookings
CREATE POLICY "Authenticated users can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete bookings
CREATE POLICY "Authenticated users can delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- Service role can manage bookings (for webhooks)
CREATE POLICY "Service role can manage bookings"
  ON bookings FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- CLIENTS POLICIES
-- ============================================

-- Authenticated users have full access to clients
CREATE POLICY "Authenticated users can view clients"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete clients"
  ON clients FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- PROJECTS POLICIES
-- ============================================

-- Authenticated users have full access to projects
CREATE POLICY "Authenticated users can view projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- LEAD NOTES POLICIES
-- ============================================

-- Authenticated users can view all lead notes
CREATE POLICY "Authenticated users can view lead notes"
  ON lead_notes FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can create lead notes
CREATE POLICY "Authenticated users can create lead notes"
  ON lead_notes FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Users can update their own notes
CREATE POLICY "Users can update own lead notes"
  ON lead_notes FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can delete their own notes
CREATE POLICY "Users can delete own lead notes"
  ON lead_notes FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================
-- LEAD ACTIVITIES POLICIES
-- ============================================

-- Authenticated users can view all lead activities
CREATE POLICY "Authenticated users can view lead activities"
  ON lead_activities FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can create lead activities
CREATE POLICY "Authenticated users can create lead activities"
  ON lead_activities FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Service role can create activities (for system logs)
CREATE POLICY "Service role can manage lead activities"
  ON lead_activities FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- EMAIL TEMPLATES POLICIES
-- ============================================

-- Authenticated users can view active templates
CREATE POLICY "Authenticated users can view email templates"
  ON email_templates FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can create templates
CREATE POLICY "Authenticated users can create email templates"
  ON email_templates FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Users can update templates they created
CREATE POLICY "Users can update own email templates"
  ON email_templates FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid() OR created_by IS NULL)
  WITH CHECK (true);

-- Users can delete templates they created
CREATE POLICY "Users can delete own email templates"
  ON email_templates FOR DELETE
  TO authenticated
  USING (created_by = auth.uid() OR created_by IS NULL);

-- ============================================
-- EMAIL LOGS POLICIES
-- ============================================

-- Authenticated users can view all email logs
CREATE POLICY "Authenticated users can view email logs"
  ON email_logs FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can create email logs
CREATE POLICY "Authenticated users can create email logs"
  ON email_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Service role can manage email logs (for webhooks)
CREATE POLICY "Service role can manage email logs"
  ON email_logs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- CRM USERS POLICIES
-- ============================================

-- Users can view all CRM users (for team display)
CREATE POLICY "Authenticated users can view crm users"
  ON crm_users FOR SELECT
  TO authenticated
  USING (true);

-- Users can only update their own profile
CREATE POLICY "Users can update own crm profile"
  ON crm_users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Users can insert their own profile
CREATE POLICY "Users can insert own crm profile"
  ON crm_users FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- ============================================
-- FUNCTION: Auto-create CRM user profile on signup
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.crm_users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create CRM user profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
