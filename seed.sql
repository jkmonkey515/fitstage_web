-- Populate demo user profiles
INSERT INTO profiles (id, email, username, full_name, avatar_url, bio, location, role, status)
VALUES
  -- Admin
  ('d7bed82c-0d74-4b4d-b5f3-738d3edb750e', 'admin@demo.com', 'admin', 'Admin User', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7', 'Platform administrator', 'San Francisco, CA', 'admin', 'active'),
  
  -- Competitors
  ('f4b3d8c2-1e5a-4b7f-9c6d-2e8f9a3b5c4d', 'alex@demo.com', 'alexfitpro', 'Alex Rivera', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61', 'Professional athlete specializing in CrossFit and functional fitness', 'Los Angeles, CA', 'competitor', 'active'),
  ('a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d', 'sarah@demo.com', 'sarahfit', 'Sarah Chen', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', 'Fitness enthusiast and powerlifting specialist', 'New York, NY', 'competitor', 'active'),
  ('b2c3d4e5-f6a7-5b8c-9d0e-1f2a3b4c5d6e', 'marcus@demo.com', 'marcusfitness', 'Marcus Johnson', 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5', 'Bodybuilding champion and fitness coach', 'Chicago, IL', 'competitor', 'active'),
  
  -- Spectators
  ('c3d4e5f6-a7b8-6c9d-0e1f-2a3b4c5d6e7f', 'mike@demo.com', 'mikefitness', 'Mike Johnson', 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5', 'Fitness enthusiast and community supporter', 'Chicago, IL', 'spectator', 'active');

-- Populate competitor profiles with additional details
INSERT INTO competitor_profiles (user_id, specialties, experience_years, achievements, social_links, verified_status)
VALUES
  ('f4b3d8c2-1e5a-4b7f-9c6d-2e8f9a3b5c4d', ARRAY['CrossFit', 'Olympic Weightlifting', 'HIIT'], 8, 
   '{"achievements": [
      {"title": "West Coast Championship 2023", "place": "1st"},
      {"title": "CrossFit Regional Qualifier", "place": "Top 5"}
    ]}'::jsonb,
   '{"instagram": "alexfitpro", "youtube": "AlexRiveraFitness"}'::jsonb,
   true),
   
  ('a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d', ARRAY['Powerlifting', 'Strength Training', 'Nutrition'], 6,
   '{"achievements": [
      {"title": "National Powerlifting Championship", "place": "2nd"},
      {"title": "State Record Holder - 63kg class", "year": "2023"}
    ]}'::jsonb,
   '{"instagram": "sarahfit", "tiktok": "sarahfitness"}'::jsonb,
   true),
   
  ('b2c3d4e5-f6a7-5b8c-9d0e-1f2a3b4c5d6e', ARRAY['Bodybuilding', 'Physique', 'Contest Prep'], 10,
   '{"achievements": [
      {"title": "Mr. Universe - Classic Physique", "place": "Top 5"},
      {"title": "National Bodybuilding Champion", "year": "2022"}
    ]}'::jsonb,
   '{"instagram": "marcusfitness", "youtube": "MarcusJ"}'::jsonb,
   true);

-- Create some sample posts
INSERT INTO posts (id, user_id, content, media_urls, tags, type)
VALUES
  (uuid_generate_v4(), 'f4b3d8c2-1e5a-4b7f-9c6d-2e8f9a3b5c4d',
   'Morning workout complete! 💪 New PR on clean and jerks today. Remember: progress is progress, no matter how small.',
   ARRAY['https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5'],
   ARRAY['fitness', 'crossfit', 'motivation'],
   'photo'),
   
  (uuid_generate_v4(), 'a1b2c3d4-e5f6-4a5b-8c7d-9e8f7a6b5c4d',
   'Competition prep going strong! 🏋️‍♀️ Sharing my favorite pre-workout meal recipe in the comments.',
   ARRAY['https://images.unsplash.com/photo-1547496502-affa22d38842'],
   ARRAY['nutrition', 'powerlifting', 'preplife'],
   'photo'),
   
  (uuid_generate_v4(), 'b2c3d4e5-f6a7-5b8c-9d0e-1f2a3b4c5d6e',
   'Stage ready! 🏆 Final preparations for the upcoming national championships.',
   ARRAY['https://images.unsplash.com/photo-1583454110551-21f2fa2afe61'],
   ARRAY['bodybuilding', 'competition', 'motivation'],
   'photo');

-- Add some post interactions
INSERT INTO post_interactions (post_id, user_id, type, content)
SELECT 
  p.id,
  pr.id,
  'like',
  NULL
FROM posts p
CROSS JOIN profiles pr
WHERE pr.role = 'spectator'
LIMIT 10;

-- Add some votes
INSERT INTO votes (voter_id, competitor_id, category)
SELECT 
  pr.id,
  c.id,
  'Men''s Physique'
FROM profiles pr
CROSS JOIN profiles c
WHERE pr.role = 'spectator'
AND c.role = 'competitor'
LIMIT 5;

-- Add some audit logs
INSERT INTO audit_log (action, entity_type, entity_id, user_id, details)
VALUES
  ('CREATE', 'post', 'sample_post_1', 'f4b3d8c2-1e5a-4b7f-9c6d-2e8f9a3b5c4d', '{"message": "Created new post"}'::jsonb),
  ('VOTE', 'competitor', 'f4b3d8c2-1e5a-4b7f-9c6d-2e8f9a3b5c4d', 'c3d4e5f6-a7b8-6c9d-0e1f-2a3b4c5d6e7f', '{"category": "Men''s Physique"}'::jsonb);