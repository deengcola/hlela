-- Planners (event organisers who submit briefs)
create table if not exists planners (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text not null,
  phone text,
  company text,
  password_hash text,
  account_activated boolean not null default false,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);

alter table planners enable row level security;

create policy "insert planners" on planners
  for insert to public with check (true);

create policy "select planners" on planners
  for select to public using (true);

create policy "update planners" on planners
  for update to public using (true);

grant insert, select, update on planners to anon;

-- Supplier subscription flag
alter table suppliers add column if not exists subscription_active boolean not null default false;
alter table suppliers add column if not exists cover_banner_url text;
alter table suppliers add column if not exists bio text;
alter table suppliers add column if not exists instagram_url text;
alter table suppliers add column if not exists facebook_url text;

-- Supplier catalogue items (Instagram-style grid)
create table if not exists catalogue_items (
  id uuid primary key default gen_random_uuid(),
  supplier_slug text not null,
  title text not null,
  description text,
  price numeric,
  unit text default 'per item',
  category text,
  image_url text,
  available boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table catalogue_items enable row level security;

create policy "select catalogue_items" on catalogue_items
  for select to public using (true);

create policy "insert catalogue_items" on catalogue_items
  for insert to public with check (true);

grant select, insert on catalogue_items to anon;
