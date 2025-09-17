-- Enable Row Level Security and create policies

-- Enable RLS on all tables
alter table quotes enable row level security;
alter table media_assets enable row level security;

-- Create policies for public read access
create policy "Public read quotes" on quotes for select using (true);
create policy "Public read media" on media_assets for select using (true);