-- Add SEO settings to platform_settings table
alter table public.platform_settings
add column if not exists seo_settings jsonb default '{
    "meta_title": "",
    "meta_description": "",
    "header_scripts": "",
    "body_scripts": "",
    "robots_txt": "User-agent: *\nAllow: /",
    "sitemap_settings": {
        "exclude_paths": [],
        "update_frequency": "weekly",
        "priority": 0.8
    }
}'::jsonb;

-- Create pages table for sitemap generation
create table if not exists public.pages (
    id uuid default uuid_generate_v4() primary key,
    path text not null unique,
    title text,
    meta_title text,
    meta_description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies for pages
alter table public.pages enable row level security;

create policy "Pages are viewable by everyone"
    on pages for select
    using (true);

create policy "Only admins can modify pages"
    on pages for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role = 'admin'
        )
    );

-- Create function to update sitemap
create or replace function update_sitemap()
returns trigger as $$
begin
    -- Trigger sitemap regeneration logic here
    -- This is a placeholder - actual implementation would depend on your setup
    return new;
end;
$$ language plpgsql;

-- Create trigger for sitemap updates
create trigger update_sitemap_on_page_change
    after insert or update or delete on public.pages
    for each statement
    execute function update_sitemap();

-- Create indexes
create index if not exists pages_path_idx on public.pages (path);
create index if not exists pages_updated_at_idx on public.pages (updated_at);

-- Update timestamp trigger for pages
create trigger set_timestamp_pages
    before update on public.pages
    for each row
    execute function public.handle_updated_at();