-- Add platform settings table for admin configuration
create table public.platform_settings (
    id uuid default uuid_generate_v4() primary key,
    logo_url text,
    footer_links jsonb default '[]'::jsonb,
    social_links jsonb default '{
        "instagram": "",
        "twitter": "",
        "linkedin": "",
        "youtube": "",
        "facebook": "",
        "tiktok": ""
    }'::jsonb,
    cta_text jsonb default '{
        "competitor": "Register as Competitor",
        "promoter": "Become a Promoter"
    }'::jsonb,
    updated_at timestamp with time zone default now()
);

-- Add promoter applications table
create table public.promoter_applications (
    id uuid default uuid_generate_v4() primary key,
    profile_id uuid references public.profiles on delete cascade,
    company_name text not null,
    contact_name text not null,
    email text not null,
    phone text,
    website text,
    company_size text,
    event_experience text,
    proposed_events text,
    marketing_strategy text,
    company_logo_url text,
    status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Add competitor applications table
create table public.competitor_applications (
    id uuid default uuid_generate_v4() primary key,
    profile_id uuid references public.profiles on delete cascade,
    category_id uuid references public.categories on delete cascade,
    experience text,
    achievements text,
    goals text,
    social_media jsonb default '{
        "instagram": "",
        "youtube": "",
        "tiktok": ""
    }'::jsonb,
    profile_image_url text,
    status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Add competitor profile settings
alter table public.competitor_details add column if not exists
    hero_image_url text,
    profile_settings jsonb default '{
        "show_social_links": true,
        "show_achievements": true,
        "show_competitions": true,
        "show_stats": true
    }'::jsonb;

-- Add competition media table
create table public.competition_media (
    id uuid default uuid_generate_v4() primary key,
    competition_id uuid references public.competitions on delete cascade,
    url text not null,
    type text check (type in ('image', 'video')) default 'image',
    title text,
    description text,
    created_at timestamp with time zone default now()
);

-- Add competition updates/announcements
create table public.competition_updates (
    id uuid default uuid_generate_v4() primary key,
    competition_id uuid references public.competitions on delete cascade,
    title text not null,
    content text not null,
    important boolean default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Add competitor progress tracking
create table public.competitor_progress (
    id uuid default uuid_generate_v4() primary key,
    competitor_id uuid references public.competitors on delete cascade,
    date timestamp with time zone default now(),
    metrics jsonb,
    notes text,
    media_urls text[],
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Add voting periods table
create table public.voting_periods (
    id uuid default uuid_generate_v4() primary key,
    competition_id uuid references public.competitions on delete cascade,
    category_id uuid references public.categories on delete cascade,
    start_date timestamp with time zone not null,
    end_date timestamp with time zone not null,
    status text check (status in ('upcoming', 'active', 'completed')) default 'upcoming',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Add competitor rankings table
create table public.competitor_rankings (
    id uuid default uuid_generate_v4() primary key,
    competitor_id uuid references public.competitors on delete cascade,
    competition_id uuid references public.competitions on delete cascade,
    category_id uuid references public.categories on delete cascade,
    rank integer,
    points integer default 0,
    vote_count integer default 0,
    updated_at timestamp with time zone default now()
);

-- Add platform analytics table
create table public.platform_analytics (
    id uuid default uuid_generate_v4() primary key,
    date date default current_date,
    metrics jsonb default '{
        "total_users": 0,
        "new_users": 0,
        "active_competitions": 0,
        "total_votes": 0,
        "total_posts": 0
    }'::jsonb,
    created_at timestamp with time zone default now()
);

-- Add indexes for new tables
create index idx_promoter_applications_status on public.promoter_applications(status);
create index idx_competitor_applications_status on public.competitor_applications(status);
create index idx_competition_updates_competition_id on public.competition_updates(competition_id);
create index idx_competitor_progress_competitor_id on public.competitor_progress(competitor_id);
create index idx_voting_periods_competition_id on public.voting_periods(competition_id);
create index idx_competitor_rankings_competition_id on public.competitor_rankings(competition_id);

-- Add triggers for new tables
create trigger set_timestamp_promoter_applications
    before update on public.promoter_applications
    for each row
    execute function update_updated_at_column();

create trigger set_timestamp_competitor_applications
    before update on public.competitor_applications
    for each row
    execute function update_updated_at_column();

create trigger set_timestamp_competition_updates
    before update on public.competition_updates
    for each row
    execute function update_updated_at_column();

-- Add RLS policies for new tables
alter table public.platform_settings enable row level security;
alter table public.promoter_applications enable row level security;
alter table public.competitor_applications enable row level security;
alter table public.competition_media enable row level security;
alter table public.competition_updates enable row level security;
alter table public.competitor_progress enable row level security;
alter table public.voting_periods enable row level security;
alter table public.competitor_rankings enable row level security;
alter table public.platform_analytics enable row level security;

-- Platform settings policies
create policy "Platform settings viewable by everyone"
    on public.platform_settings for select
    using (true);

create policy "Only admins can modify platform settings"
    on public.platform_settings for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role = 'admin'
        )
    );

-- Promoter applications policies
create policy "Users can view their own applications"
    on public.promoter_applications for select
    using (auth.uid() = profile_id);

create policy "Users can submit applications"
    on public.promoter_applications for insert
    with check (auth.uid() = profile_id);

-- Competitor applications policies
create policy "Users can view their own applications"
    on public.competitor_applications for select
    using (auth.uid() = profile_id);

create policy "Users can submit applications"
    on public.competitor_applications for insert
    with check (auth.uid() = profile_id);

-- Competition media policies
create policy "Competition media viewable by everyone"
    on public.competition_media for select
    using (true);

-- Competition updates policies
create policy "Competition updates viewable by everyone"
    on public.competition_updates for select
    using (true);

-- Competitor progress policies
create policy "Competitor progress viewable by everyone"
    on public.competitor_progress for select
    using (true);

create policy "Competitors can update their own progress"
    on public.competitor_progress for insert
    with check (
        exists (
            select 1 from public.competitors
            where id = competitor_id
            and profile_id = auth.uid()
        )
    );

-- Initial platform settings
insert into public.platform_settings (
    logo_url,
    footer_links,
    social_links,
    cta_text
) values (
    '/fitstage-logo.svg',
    '[
        {"label": "Competition Rules", "url": "/rules", "isExternal": false},
        {"label": "FAQs", "url": "/faq", "isExternal": false},
        {"label": "Contact Us", "url": "/contact", "isExternal": false},
        {"label": "Privacy Policy", "url": "/privacy", "isExternal": false},
        {"label": "Terms of Service", "url": "/terms", "isExternal": false}
    ]'::jsonb,
    '{
        "instagram": "https://instagram.com/fitstage",
        "twitter": "https://twitter.com/fitstage",
        "linkedin": "https://linkedin.com/company/fitstage",
        "youtube": "https://youtube.com/fitstage",
        "facebook": "https://facebook.com/fitstage",
        "tiktok": "https://tiktok.com/@fitstage"
    }'::jsonb,
    '{
        "competitor": "Register as Competitor",
        "promoter": "Become a Promoter"
    }'::jsonb
);

-- Function to update competitor rankings
create or replace function update_competitor_rankings()
returns trigger as $$
begin
    insert into public.competitor_rankings (
        competitor_id,
        competition_id,
        category_id,
        vote_count
    )
    values (
        new.competitor_id,
        new.competition_id,
        new.category_id,
        1
    )
    on conflict (competitor_id, competition_id, category_id)
    do update set
        vote_count = competitor_rankings.vote_count + 1,
        updated_at = now();
    
    return new;
end;
$$ language plpgsql;

-- Trigger for updating rankings on new vote
create trigger update_rankings_on_vote
    after insert on public.votes
    for each row
    execute function update_competitor_rankings();

-- Function to check if voting period is active
create or replace function is_voting_period_active(competition_uuid uuid, category_uuid uuid)
returns boolean as $$
    select exists(
        select 1
        from public.voting_periods
        where competition_id = competition_uuid
        and category_id = category_uuid
        and status = 'active'
        and now() between start_date and end_date
    );
$$ language sql;