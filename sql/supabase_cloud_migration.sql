-- Create tables for Lou Gehrig Fan Club

-- Quotes table for storing Lou Gehrig quotes and sayings
create table if not exists quotes (
    id uuid primary key default gen_random_uuid(),
    text text not null,
    author text default 'Lou Gehrig',
    created_at timestamptz default now()
);

-- Media assets table for storing images and other media
create table if not exists media_assets (
    id uuid primary key default gen_random_uuid(),
    filename text,
    url text,
    width int,
    height int,
    orientation text,
    tags text[] default '{}',
    status text default 'approved',
    created_at timestamptz default now()
);

-- Enable Row Level Security and create policies

-- Enable RLS on all tables
alter table quotes enable row level security;
alter table media_assets enable row level security;

-- Create policies for public read access
create policy "Public read quotes" on quotes for select using (true);
create policy "Public read media" on media_assets for select using (true);