-- Seed data for local development

-- Insert some sample quotes
INSERT INTO quotes (text, author) VALUES 
('Today I consider myself the luckiest man on the face of the earth.', 'Lou Gehrig'),
('The ballplayer who loses his head, who can''t keep his cool, is worse than no ballplayer at all.', 'Lou Gehrig'),
('I''m not a headline guy. I know that as long as I was following Babe to the plate I could have stood on my head and no one would have known the difference.', 'Lou Gehrig')
ON CONFLICT DO NOTHING;

-- Insert some sample media assets
INSERT INTO media_assets (filename, url, width, height, orientation, tags, status) VALUES 
('gehrig_portrait.jpg', '/images/gehrig_portrait.jpg', 800, 600, 'landscape', '{"portrait", "historical"}', 'approved'),
('gehrig_batting.jpg', '/images/gehrig_batting.jpg', 600, 800, 'portrait', '{"action", "batting"}', 'approved'),
('farewell_speech.jpg', '/images/farewell_speech.jpg', 1000, 750, 'landscape', '{"farewell", "speech", "historical"}', 'approved')
ON CONFLICT DO NOTHING;