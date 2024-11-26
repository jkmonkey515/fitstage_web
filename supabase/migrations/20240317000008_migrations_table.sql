-- Create migrations tracking table
create table if not exists public._migrations (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,
    sql text not null,
    executed_at timestamp with time zone default now(),
    created_at timestamp with time zone default now()
);

-- Add RLS policies
alter table public._migrations enable row level security;

create policy "Migrations are viewable by everyone"
    on public._migrations for select
    using (true);

create policy "Only admins can modify migrations"
    on public._migrations for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role = 'admin'
        )
    );

-- Create index
create index if not exists migrations_executed_at_idx on public._migrations (executed_at);