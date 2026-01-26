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
('Alice Johnson', 'alice@techstart.com', 'TechStart', 'web', 'new'),
('Bob Smith', 'bob@consulting.com', 'Smith Consulting', 'branding', 'contacted');
