-- Create version tracking tables
create table public.platform_versions (
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

create table public.migration_history (
    id uuid default uuid_generate_v4() primary key,
    version_id uuid references public.platform_versions(id),
    migration_file text not null,
    executed_at timestamp with time zone default now(),
    executed_by uuid references auth.users(id),
    status text check (status in ('success', 'failed', 'rolled_back')) not null,
    error_message text,
    rollback_at timestamp with time zone,
    rollback_by uuid references auth.users(id)
);

-- Function to record migration execution
create or replace function record_migration_execution(
    p_version_id uuid,
    p_migration_file text,
    p_status text,
    p_error_message text default null
)
returns uuid
language plpgsql
security definer
as $$
declare
    v_migration_id uuid;
begin
    insert into public.migration_history (
        version_id,
        migration_file,
        status,
        error_message,
        executed_by
    )
    values (
        p_version_id,
        p_migration_file,
        p_status,
        p_error_message,
        auth.uid()
    )
    returning id into v_migration_id;

    return v_migration_id;
end;
$$;

-- Function to record migration rollback
create or replace function record_migration_rollback(
    p_migration_id uuid
)
returns void
language plpgsql
security definer
as $$
begin
    update public.migration_history
    set
        status = 'rolled_back',
        rollback_at = now(),
        rollback_by = auth.uid()
    where id = p_migration_id;
end;
$$;

-- Initial version record
insert into public.platform_versions (
    version,
    type,
    description,
    changes,
    files,
    migrations
) values (
    '1.0.0',
    'major',
    'Initial platform release',
    '[
        "Core platform features",
        "Competition management",
        "Voting system",
        "User profiles and onboarding",
        "Admin panel"
    ]'::jsonb,
    '[
        "src/pages/*",
        "src/components/*",
        "src/contexts/*"
    ]'::jsonb,
    '[
        "20240317000001_platform_updates.sql",
        "20240317000002_version_tracking.sql"
    ]'::jsonb
);

-- RLS Policies
alter table public.platform_versions enable row level security;
alter table public.migration_history enable row level security;

create policy "Platform versions viewable by everyone"
    on public.platform_versions for select
    using (true);

create policy "Platform versions modifiable by admins only"
    on public.platform_versions for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role = 'admin'
        )
    );

create policy "Migration history viewable by everyone"
    on public.migration_history for select
    using (true);

create policy "Migration history modifiable by admins only"
    on public.migration_history for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role = 'admin'
        )
    );