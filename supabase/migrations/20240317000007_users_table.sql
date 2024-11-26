-- Create users table that mirrors Profile interface
create table if not exists public.users (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    role text check (role in ('admin', 'competitor', 'spectator')) not null default 'spectator',
    username text unique not null,
    name text,
    avatar_url text,
    bio text,
    location text,
    specialties text[],
    achievements jsonb default '[]'::jsonb,
    social_links jsonb default '{
        "instagram": null,
        "youtube": null,
        "tiktok": null
    }'::jsonb,
    status text check (status in ('active', 'disabled')) not null default 'active',
    onboarding_completed boolean default false,
    voting_history jsonb default '[]'::jsonb,
    following_list jsonb default '[]'::jsonb,
    followed_athletes uuid[] default array[]::uuid[],
    saved_posts uuid[] default array[]::uuid[],
    voting_preferences jsonb default '{
        "preferred_categories": [],
        "notification_preferences": {
            "new_competitions": true,
            "voting_reminders": true,
            "followed_athlete_updates": true
        }
    }'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    last_login timestamp with time zone,
    email_verified boolean default false,
    phone text,
    phone_verified boolean default false
);