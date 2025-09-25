-- Migration: Setup complete database schema for phases 3-4
-- Description: Creates all required tables with idempotent DDL

-- Ensure media_assets table exists (might already exist with test data)
create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  url text not null,
  width int,
  height int,
  created_at timestamptz default now(),
  created_by uuid
);

-- Ensure quotes table exists and has required columns
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  source text,
  week date,
  created_at timestamptz default now()
);

-- Add missing columns to quotes if they don't exist
-- Note: This is safe in PostgreSQL - will be ignored if column exists
alter table quotes add column if not exists text text;
alter table quotes add column if not exists source text;
alter table quotes add column if not exists week date;

-- Update text column to not null if it exists but allows null
alter table quotes alter column text set not null;

-- Content & events tables
create table if not exists charities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text,
  blurb text,
  created_at timestamptz default now()
);

create table if not exists milestones (
  id uuid primary key default gen_random_uuid(),
  happened_on date not null,
  title text not null,
  body text,
  image_url text
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('news','qna')),
  title text not null,
  body text,
  published_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  body text
);

-- Weekly photo matchup tables
create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  title text,
  url text not null,
  width int,
  height int,
  created_at timestamptz default now()
);

create table if not exists matchups (
  id uuid primary key default gen_random_uuid(),
  photo_a uuid references photos(id) on delete set null,
  photo_b uuid references photos(id) on delete set null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text default 'scheduled' check (status in ('scheduled','active','closed')),
  created_at timestamptz default now()
);

create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  matchup_id uuid references matchups(id) on delete cascade,
  choice text not null check (choice in ('A','B')),
  voter_fingerprint text not null,
  created_at timestamptz default now(),
  unique (matchup_id, voter_fingerprint)
);

-- Insert minimal seed data ONLY if tables are empty
insert into charities (name, url, blurb)
select 'ALS Research Foundation', 'https://www.alsa.org', 'Supporting research to find treatments and a cure for ALS'
where not exists (select 1 from charities);

insert into milestones (happened_on, title, body)
select '1939-07-04', 'Lou Gehrig Farewell Speech', 'The famous "Today I consider myself the luckiest man on the face of the earth" speech at Yankee Stadium'
where not exists (select 1 from milestones);

insert into posts (kind, title, body)
select 'news', 'Welcome to the Lou Gehrig Fan Club', 'Join us in celebrating the legacy of the Iron Horse and supporting ALS research.'
where not exists (select 1 from posts where kind = 'news');

insert into posts (kind, title, body)
select 'qna', 'What made Lou Gehrig special?', 'Lou Gehrig''s consecutive games record of 2,130 games and his courage in facing ALS made him a legend both on and off the field.'
where not exists (select 1 from posts where kind = 'qna');

insert into events (title, starts_at, location, body)
select 'Annual ALS Awareness Day', current_date + interval '30 days', 'Yankee Stadium', 'Join us for a day of remembrance and fundraising for ALS research.'
where not exists (select 1 from events);