-- Create profiles table
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text,
    role text check (role in ('admin', 'competitor', 'spectator')) not null default 'spectator',
    username text unique,
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
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
    on profiles for select
    using (true);

create policy "Users can insert their own profile"
    on profiles for insert
    with check (auth.uid() = id);

create policy "Users can update their own profile"
    on profiles for update
    using (auth.uid() = id);

-- Create indexes
create index if not exists profiles_username_idx on public.profiles (username);
create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_status_idx on public.profiles (status);
create index if not exists profiles_email_idx on public.profiles (email);

-- Function to handle updating timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- Create trigger for updating timestamps
drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
    before update on public.profiles
    for each row
    execute function public.handle_updated_at();

-- Function to automatically create profile after signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email, username, name, avatar_url)
    values (
        new.id,
        new.email,
        new.raw_user_meta_data->>'username',
        new.raw_user_meta_data->>'name',
        new.raw_user_meta_data->>'avatar_url'
    );
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- Insert initial admin user if not exists
do $$
begin
    if not exists (
        select 1 from public.profiles
        where role = 'admin'
        limit 1
    ) then
        insert into public.profiles (
            id,
            role,
            username,
            name,
            email,
            status
        ) values (
            '00000000-0000-0000-0000-000000000000',
            'admin',
            'admin',
            'System Admin',
            'admin@fitstage.io',
            'active'
        );
    end if;
end
$$;