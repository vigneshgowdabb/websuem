-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- LEADS TABLE
create table if not exists leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  company text,
  service_interested text,
  message text,
  source text default 'website',
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- BOOKINGS TABLE
create table if not exists bookings (
  id uuid default uuid_generate_v4() primary key,
  lead_id uuid references leads(id),
  title text not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  status text default 'scheduled',
  meeting_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE ROW LEVEL SECURITY
alter table leads enable row level security;
alter table bookings enable row level security;

-- POLICIES (OPEN FOR DEMO PURPOSES - In production, lock this down!)
-- Allow public insert (for contact form)
create policy "Allow public insert leads" on leads for insert with check (true);

-- Allow public read (for dashboard demo - normally this would be authenticated only)
create policy "Allow public read leads" on leads for select using (true);
create policy "Allow public read bookings" on bookings for select using (true);

-- SEED DATA (Optional)
insert into leads (name, email, company, service_interested, status)
values 
('Bob Smith', 'bob@consulting.com', 'Smith Consulting', 'branding', 'contacted');

-- CLIENTS TABLE
create table if not exists clients (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  company text,
  email text,
  status text default 'active',
  total_revenue numeric default 0,
  last_project_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CRM USERS TABLE (Profiles for dashboard access)
create table if not exists crm_users (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE RLS
alter table clients enable row level security;
alter table crm_users enable row level security;

-- POLICIES
-- Clients: Allow public read/write for now (Demo Purpose)
create policy "Allow public access clients" on clients for all using (true) with check (true);

-- CRM Users: Users can only read/update their own profile
create policy "Users can view own profile" on crm_users for select using (auth.uid() = id);
create policy "Users can update own profile" on crm_users for update using (auth.uid() = id);
