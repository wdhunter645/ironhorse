-- Seed data for IronHorse - Lou Gehrig Fan Club
-- Migration: 20250101000001_seed_data.sql

-- Insert sample quotes
insert into public.quotes (text, author) values 
('Today I consider myself the luckiest man on the face of the earth.', 'Lou Gehrig'),
('The ballplayer who loses his head, who can''t keep his cool, is worse than no ballplayer at all.', 'Lou Gehrig'),
('I''m not a headline guy. I know that as long as I was following Babe to the plate I could have stood on my head and no one would have known the difference.', 'Lou Gehrig'),
('Let''s face it. I''m not a headline guy. I always knew that as long as I was following Babe to the plate I could have stood on my head and no one would have known the difference.', 'Lou Gehrig'),
('I may have been given a bad break, but I''ve got an awful lot to live for.', 'Lou Gehrig')
on conflict (id) do nothing;

-- Insert sample media assets
insert into public.media_assets (filename, url, width, height, orientation, tags, status) values 
('gehrig_portrait.jpg', '/images/gehrig_portrait.jpg', 800, 600, 'landscape', '{"portrait", "historical"}', 'approved'),
('gehrig_batting.jpg', '/images/gehrig_batting.jpg', 600, 800, 'portrait', '{"action", "batting"}', 'approved'),
('farewell_speech.jpg', '/images/farewell_speech.jpg', 1000, 750, 'landscape', '{"farewell", "speech", "historical"}', 'approved'),
('yankee_stadium.jpg', '/images/yankee_stadium.jpg', 1200, 800, 'landscape', '{"stadium", "historical"}', 'approved'),
('iron_horse.jpg', '/images/iron_horse.jpg', 900, 600, 'landscape', '{"nickname", "portrait"}', 'approved')
on conflict (id) do nothing;