-- Add spectator profile enhancements
alter table public.profiles 
    add column if not exists voting_history jsonb default '[]'::jsonb;

alter table public.profiles 
    add column if not exists following_list jsonb default '[]'::jsonb;

alter table public.profiles 
    add column if not exists voting_preferences jsonb default '{
        "preferred_categories": [],
        "notification_preferences": {
            "new_competitions": true,
            "voting_reminders": true,
            "followed_athlete_updates": true
        }
    }'::jsonb;

-- Rest of the migration remains the same
create table public.voting_progress (
    id uuid default uuid_generate_v4() primary key,
    spectator_id uuid references auth.users(id),
    competition_id uuid references public.competitions(id),
    category_id uuid references public.categories(id),
    votes_used integer default 0,
    max_votes integer not null,
    last_vote_at timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Add competitor onboarding tracking
create table public.competitor_onboarding (
    id uuid default uuid_generate_v4() primary key,
    competitor_id uuid references auth.users(id),
    current_step integer default 0,
    completed_steps jsonb default '[]'::jsonb,
    profile_image_url text,
    cover_image_url text,
    specialties text[],
    experience_years integer,
    achievements jsonb default '[]'::jsonb,
    social_links jsonb default '{
        "instagram": null,
        "youtube": null,
        "tiktok": null
    }'::jsonb,
    is_completed boolean default false,
    started_at timestamp with time zone default now(),
    completed_at timestamp with time zone,
    updated_at timestamp with time zone default now()
);

-- Add competition management enhancements
alter table public.competitions 
    add column if not exists rules jsonb default '[]'::jsonb;

alter table public.competitions 
    add column if not exists schedule jsonb default '[]'::jsonb;

alter table public.competitions 
    add column if not exists media_gallery jsonb default '[]'::jsonb;

alter table public.competitions 
    add column if not exists registration_deadline timestamp with time zone;

alter table public.competitions 
    add column if not exists entry_fee decimal(10,2);

alter table public.competitions 
    add column if not exists prize_distribution jsonb default '{}'::jsonb;

alter table public.competitions 
    add column if not exists deleted_at timestamp with time zone;

-- Add voting analytics
create table public.voting_analytics (
    id uuid default uuid_generate_v4() primary key,
    competition_id uuid references public.competitions(id),
    category_id uuid references public.categories(id),
    date date default current_date,
    total_votes integer default 0,
    unique_voters integer default 0,
    votes_by_hour jsonb default '{}'::jsonb,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Add functions for voting analytics
create or replace function update_voting_analytics()
returns trigger as $$
begin
    insert into public.voting_analytics (
        competition_id,
        category_id,
        date,
        total_votes,
        unique_voters,
        votes_by_hour
    )
    values (
        new.competition_id,
        new.category_id,
        current_date,
        1,
        1,
        jsonb_build_object(
            extract(hour from current_timestamp)::text,
            1
        )
    )
    on conflict (competition_id, category_id, date)
    do update set
        total_votes = voting_analytics.total_votes + 1,
        unique_voters = (
            select count(distinct spectator_id)
            from public.votes
            where competition_id = new.competition_id
            and category_id = new.category_id
            and date(created_at) = current_date
        ),
        votes_by_hour = voting_analytics.votes_by_hour || 
            jsonb_build_object(
                extract(hour from current_timestamp)::text,
                coalesce(
                    (voting_analytics.votes_by_hour->>extract(hour from current_timestamp)::text)::integer,
                    0
                ) + 1
            ),
        updated_at = now();
    
    return new;
end;
$$ language plpgsql;

-- Add trigger for voting analytics
create trigger update_voting_analytics_on_vote
    after insert on public.votes
    for each row
    execute function update_voting_analytics();

-- Add indexes
create index idx_voting_progress_spectator on public.voting_progress(spectator_id);
create index idx_voting_progress_competition on public.voting_progress(competition_id);
create index idx_competitor_onboarding_competitor on public.competitor_onboarding(competitor_id);
create index idx_voting_analytics_competition on public.voting_analytics(competition_id);
create index idx_voting_analytics_date on public.voting_analytics(date);

-- Add RLS policies
alter table public.voting_progress enable row level security;
alter table public.competitor_onboarding enable row level security;
alter table public.voting_analytics enable row level security;

-- Voting progress policies
create policy "Users can view their own voting progress"
    on public.voting_progress for select
    using (auth.uid() = spectator_id);

create policy "Users can update their own voting progress"
    on public.voting_progress for all
    using (auth.uid() = spectator_id);

-- Competitor onboarding policies
create policy "Users can view their own onboarding"
    on public.competitor_onboarding for select
    using (auth.uid() = competitor_id);

create policy "Users can update their own onboarding"
    on public.competitor_onboarding for all
    using (auth.uid() = competitor_id);

-- Voting analytics policies
create policy "Voting analytics viewable by everyone"
    on public.voting_analytics for select
    using (true);

create policy "Voting analytics modifiable by admins only"
    on public.voting_analytics for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role = 'admin'
        )
    );

-- Function to check voting eligibility
create or replace function check_voting_eligibility(
    p_spectator_id uuid,
    p_competition_id uuid,
    p_category_id uuid
)
returns boolean as $$
declare
    v_votes_used integer;
    v_max_votes integer;
begin
    select votes_used, max_votes
    into v_votes_used, v_max_votes
    from public.voting_progress
    where spectator_id = p_spectator_id
    and competition_id = p_competition_id
    and category_id = p_category_id;

    -- If no record exists, create one with default values
    if not found then
        insert into public.voting_progress (
            spectator_id,
            competition_id,
            category_id,
            votes_used,
            max_votes
        ) values (
            p_spectator_id,
            p_competition_id,
            p_category_id,
            0,
            5  -- Default max votes per category
        )
        returning votes_used, max_votes
        into v_votes_used, v_max_votes;
    end if;

    return v_votes_used < v_max_votes;
end;
$$ language plpgsql;