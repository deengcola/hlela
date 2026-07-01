create table if not exists event_briefs (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null,
  company text,
  event_type text not null,
  event_date date not null,
  guest_range text not null,
  venue text not null,
  budget_range text,
  equipment_needed text[] not null default '{}',
  additional_notes text,
  status text not null default 'new',
  admin_notes text,
  created_at timestamptz not null default now()
);

alter table event_briefs enable row level security;

create policy "insert event_briefs" on event_briefs
  for insert to public with check (true);

create policy "select event_briefs" on event_briefs
  for select to public using (true);

grant insert, select on event_briefs to anon;
