-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables and policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Posts are viewable by everyone" ON posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON posts;
DROP POLICY IF EXISTS "Users can update own posts" ON posts;
DROP POLICY IF EXISTS "Post interactions are viewable by everyone" ON post_interactions;
DROP POLICY IF EXISTS "Authenticated users can create interactions" ON post_interactions;
DROP POLICY IF EXISTS "Votes are viewable by everyone" ON votes;
DROP POLICY IF EXISTS "Authenticated users can vote" ON votes;
DROP POLICY IF EXISTS "Audit logs are viewable by admins" ON audit_log;
DROP POLICY IF EXISTS "System can create audit logs" ON audit_log;

DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS post_interactions CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS competitor_profiles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    role TEXT NOT NULL CHECK (role IN ('admin', 'competitor', 'spectator')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'disabled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create competitor profiles table
CREATE TABLE competitor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    specialties TEXT[],
    experience_years INTEGER,
    achievements JSONB,
    social_links JSONB,
    verified_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create posts table
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_urls TEXT[],
    tags TEXT[],
    type TEXT NOT NULL CHECK (type IN ('photo', 'video', 'article')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create post interactions table
CREATE TABLE post_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('like', 'comment', 'share')),
    content TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create votes table
CREATE TABLE votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    voter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    competitor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(voter_id, competitor_id, category)
);

-- Create audit log table
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitor_profiles_updated_at
    BEFORE UPDATE ON competitor_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid()::text = id::text);

CREATE POLICY "Posts are viewable by everyone"
    ON posts FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create posts"
    ON posts FOR INSERT
    WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own posts"
    ON posts FOR UPDATE
    USING (auth.uid()::text = user_id::text);

CREATE POLICY "Post interactions are viewable by everyone"
    ON post_interactions FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create interactions"
    ON post_interactions FOR INSERT
    WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Votes are viewable by everyone"
    ON votes FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can vote"
    ON votes FOR INSERT
    WITH CHECK (
        auth.uid()::text = voter_id::text AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id::text = auth.uid()::text
            AND role = 'spectator'
        )
    );

CREATE POLICY "Audit logs are viewable by admins"
    ON audit_log FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id::text = auth.uid()::text
            AND role = 'admin'
        )
    );

CREATE POLICY "System can create audit logs"
    ON audit_log FOR INSERT
    WITH CHECK (true);