-- Create platform versions table if it doesn't exist
create table if not exists public.platform_versions (
    id uuid default uuid_generate_v4() primary key,
    version text not null,
    release_date timestamp with time zone default now(),
    type text check (type in ('major', 'minor', 'patch')) not null,
    description text,
    changes jsonb default '[]'::jsonb,
    files jsonb default '[]'::jsonb,
    migrations jsonb default '[]'::jsonb,
    created_at timestamp with time zone default now(),
    created_by uuid references auth.users(id)
);

-- Fix the previous ALTER TABLE syntax error and add new columns
alter table public.profiles 
    add column if not exists followed_athletes uuid[] default array[]::uuid[],
    add column if not exists saved_posts uuid[] default array[]::uuid[];

-- Add competition categories enhancements
alter table public.categories
    add column if not exists icon text,
    add column if not exists display_order integer default 0,
    add column if not exists is_active boolean default true;

-- Add post reactions tracking
create table if not exists public.post_reactions (
    id uuid default uuid_generate_v4() primary key,
    post_id uuid references public.posts(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    reaction_type text not null check (reaction_type in ('like', 'bookmark')),
    created_at timestamp with time zone default now(),
    unique(post_id, user_id, reaction_type)
);

-- Add post comments
create table if not exists public.post_comments (
    id uuid default uuid_generate_v4() primary key,
    post_id uuid references public.posts(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    content text not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Add competition registration tracking
create table if not exists public.competition_registrations (
    id uuid default uuid_generate_v4() primary key,
    competition_id uuid references public.competitions(id) on delete cascade,
    competitor_id uuid references auth.users(id) on delete cascade,
    category_id uuid references public.categories(id),
    status text not null check (status in ('pending', 'approved', 'rejected')) default 'pending',
    payment_status text not null check (payment_status in ('pending', 'completed', 'failed')) default 'pending',
    registration_date timestamp with time zone default now(),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(competition_id, competitor_id, category_id)
);

-- Add indexes
create index if not exists idx_post_reactions_post_id on public.post_reactions(post_id);
create index if not exists idx_post_reactions_user_id on public.post_reactions(user_id);
create index if not exists idx_post_comments_post_id on public.post_comments(post_id);
create index if not exists idx_competition_registrations_competition on public.competition_registrations(competition_id);
create index if not exists idx_competition_registrations_competitor on public.competition_registrations(competitor_id);

-- Add RLS policies
alter table public.post_reactions enable row level security;
alter table public.post_comments enable row level security;
alter table public.competition_registrations enable row level security;
alter table public.platform_versions enable row level security;

-- Post reactions policies
create policy "Users can manage their own reactions"
    on public.post_reactions
    for all
    using (auth.uid() = user_id);

create policy "Everyone can view reactions"
    on public.post_reactions
    for select
    using (true);

-- Post comments policies
create policy "Users can manage their own comments"
    on public.post_comments
    for all
    using (auth.uid() = user_id);

create policy "Everyone can view comments"
    on public.post_comments
    for select
    using (true);

-- Competition registration policies
create policy "Users can view their own registrations"
    on public.competition_registrations
    for select
    using (auth.uid() = competitor_id);

create policy "Users can create their own registrations"
    on public.competition_registrations
    for insert
    with check (auth.uid() = competitor_id);

create policy "Admins can manage all registrations"
    on public.competition_registrations
    for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role = 'admin'
        )
    );

-- Platform versions policies
create policy "Platform versions viewable by everyone"
    on public.platform_versions
    for select
    using (true);

create policy "Platform versions modifiable by admins only"
    on public.platform_versions
    for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role = 'admin'
        )
    );

-- Update version tracking
insert into public.platform_versions (
    version,
    type,
    description,
    changes,
    files,
    migrations
) values (
    '1.0.1',
    'minor',
    'Platform enhancements and bug fixes',
    '[
        "Fixed profile following functionality",
        "Enhanced post interactions",
        "Added competition registration tracking",
        "Improved category management"
    ]'::jsonb,
    '[
        "src/components/*",
        "src/pages/*",
        "supabase/migrations/*"
    ]'::jsonb,
    '[
        "20240317000004_platform_updates_3.sql"
    ]'::jsonb
);