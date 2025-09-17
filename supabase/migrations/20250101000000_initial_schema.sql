-- Initial database schema for IronHorse - Lou Gehrig Fan Club
-- Migration: 20250101000000_initial_schema.sql

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create quotes table for storing Lou Gehrig quotes and sayings
create table if not exists public.quotes (
    id uuid primary key default gen_random_uuid(),
    text text not null,
    author text default 'Lou Gehrig',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create media_assets table for storing images and other media
create table if not exists public.media_assets (
    id uuid primary key default gen_random_uuid(),
    filename text,
    url text,
    width int,
    height int,
    orientation text,
    tags text[] default '{}',
    status text default 'approved',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create indexes for better performance
create index if not exists idx_quotes_created_at on public.quotes(created_at desc);
create index if not exists idx_quotes_author on public.quotes(author);
create index if not exists idx_media_assets_created_at on public.media_assets(created_at desc);
create index if not exists idx_media_assets_status on public.media_assets(status);
create index if not exists idx_media_assets_tags on public.media_assets using gin(tags);

-- Enable Row Level Security
alter table public.quotes enable row level security;
alter table public.media_assets enable row level security;

-- Create policies for public read access
create policy "Public read access for quotes" 
on public.quotes for select 
using (true);

create policy "Public read access for media_assets" 
on public.media_assets for select 
using (true);

-- Create function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger update_quotes_updated_at 
    before update on public.quotes 
    for each row execute function public.update_updated_at_column();

create trigger update_media_assets_updated_at 
    before update on public.media_assets 
    for each row execute function public.update_updated_at_column();