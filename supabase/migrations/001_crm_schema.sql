-- CRM Schema Migration
-- This migration adds all CRM-related tables and updates existing tables

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- UPDATE EXISTING TABLES
-- ============================================

-- Add missing columns to leads table
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS website text,
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT timezone('utc'::text, now());

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for leads updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update bookings table structure
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS datetime timestamp with time zone,
  ADD COLUMN IF NOT EXISTS duration_minutes integer DEFAULT 30,
  ADD COLUMN IF NOT EXISTS type text DEFAULT 'discovery',
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  ADD COLUMN IF NOT EXISTS cal_booking_id text,
  ADD COLUMN IF NOT EXISTS attendee_name text,
  ADD COLUMN IF NOT EXISTS attendee_email text;

-- Migrate start_time to datetime if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'start_time') THEN
    UPDATE bookings SET datetime = start_time WHERE datetime IS NULL AND start_time IS NOT NULL;
    -- Calculate duration from start_time and end_time
    UPDATE bookings
    SET duration_minutes = EXTRACT(EPOCH FROM (end_time - start_time)) / 60
    WHERE duration_minutes IS NULL AND start_time IS NOT NULL AND end_time IS NOT NULL;
  END IF;
END $$;

-- Add trigger for bookings updated_at
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- CREATE NEW TABLES
-- ============================================

-- CRM Users table (linked to auth.users)
CREATE TABLE IF NOT EXISTS crm_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  role text DEFAULT 'member' CHECK (role IN ('admin', 'member', 'viewer')),
  settings jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

DROP TRIGGER IF EXISTS update_crm_users_updated_at ON crm_users;
CREATE TRIGGER update_crm_users_updated_at
  BEFORE UPDATE ON crm_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Clients table (converted leads)
CREATE TABLE IF NOT EXISTS clients (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id uuid REFERENCES leads(id) ON DELETE SET NULL,
  company_name text NOT NULL,
  contact_name text,
  email text,
  phone text,
  website text,
  address text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'inactive')),
  total_revenue numeric(12,2) DEFAULT 0,
  notes text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  service_type text CHECK (service_type IN ('website', 'social', 'automation', 'branding', 'multiple', 'other')),
  status text DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'review', 'completed', 'cancelled')),
  start_date date,
  end_date date,
  value numeric(12,2),
  notes text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Lead Notes table (activity timeline)
CREATE TABLE IF NOT EXISTS lead_notes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  content text NOT NULL,
  type text DEFAULT 'note' CHECK (type IN ('note', 'call', 'email', 'meeting', 'task')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

DROP TRIGGER IF EXISTS update_lead_notes_updated_at ON lead_notes;
CREATE TRIGGER update_lead_notes_updated_at
  BEFORE UPDATE ON lead_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Lead Activities table (automatic action logging)
CREATE TABLE IF NOT EXISTS lead_activities (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  details jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Email Templates table
CREATE TABLE IF NOT EXISTS email_templates (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  variables jsonb DEFAULT '[]',
  category text DEFAULT 'general',
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

DROP TRIGGER IF EXISTS update_email_templates_updated_at ON email_templates;
CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON email_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Email Logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id uuid REFERENCES leads(id) ON DELETE SET NULL,
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  template_id uuid REFERENCES email_templates(id) ON DELETE SET NULL,
  sent_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  recipient_email text NOT NULL,
  recipient_name text,
  subject text NOT NULL,
  body text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed')),
  resend_id text,
  metadata jsonb DEFAULT '{}',
  sent_at timestamp with time zone,
  opened_at timestamp with time zone,
  clicked_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================

-- Leads indexes
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Clients indexes
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_lead_id ON clients(lead_id);

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Bookings indexes
CREATE INDEX IF NOT EXISTS idx_bookings_lead_id ON bookings(lead_id);
CREATE INDEX IF NOT EXISTS idx_bookings_datetime ON bookings(datetime);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_cal_booking_id ON bookings(cal_booking_id);

-- Lead notes indexes
CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_created_at ON lead_notes(created_at DESC);

-- Lead activities indexes
CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_created_at ON lead_activities(created_at DESC);

-- Email logs indexes
CREATE INDEX IF NOT EXISTS idx_email_logs_lead_id ON email_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_client_id ON email_logs(client_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at DESC);

-- ============================================
-- INSERT DEFAULT EMAIL TEMPLATES
-- ============================================

INSERT INTO email_templates (name, subject, body, variables, category) VALUES
(
  'Welcome New Lead',
  'Thanks for reaching out, {{name}}!',
  E'Hi {{name}},\n\nThank you for contacting Websuem! We received your inquiry about {{service}}.\n\nWe''ll review your request and get back to you within 24 hours.\n\nBest regards,\nThe Websuem Team',
  '["name", "service"]',
  'lead'
),
(
  'Booking Confirmation',
  'Your meeting is confirmed - {{date}}',
  E'Hi {{name}},\n\nYour {{type}} meeting has been confirmed for {{date}} at {{time}}.\n\nMeeting link: {{meeting_link}}\n\nLooking forward to speaking with you!\n\nBest regards,\nThe Websuem Team',
  '["name", "type", "date", "time", "meeting_link"]',
  'booking'
),
(
  'Follow Up',
  'Following up on our conversation',
  E'Hi {{name}},\n\nI wanted to follow up on our recent conversation about {{topic}}.\n\n{{custom_message}}\n\nPlease let me know if you have any questions.\n\nBest regards,\nThe Websuem Team',
  '["name", "topic", "custom_message"]',
  'followup'
),
(
  'Proposal Sent',
  'Your custom proposal from Websuem',
  E'Hi {{name}},\n\nThank you for considering Websuem for your {{service}} project.\n\nPlease find our proposal attached. We''ve outlined:\n- Project scope and deliverables\n- Timeline: {{timeline}}\n- Investment: {{price}}\n\nLet us know if you have any questions!\n\nBest regards,\nThe Websuem Team',
  '["name", "service", "timeline", "price"]',
  'proposal'
)
ON CONFLICT DO NOTHING;
