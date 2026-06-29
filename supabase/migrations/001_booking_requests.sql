create table booking_requests (
  id uuid default gen_random_uuid() primary key,
  supplier_slug text not null,
  supplier_name text not null,
  reference text unique not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null,
  event_date date not null,
  event_type text not null,
  guest_count integer not null,
  venue_location text not null,
  equipment_needed text[] default '{}',
  notes text default '',
  status text default 'pending' check (status in ('pending', 'quoted', 'confirmed', 'declined')),
  created_at timestamptz default now()
);

alter table booking_requests enable row level security;

create policy "Anyone can insert booking requests"
  on booking_requests for insert
  to anon
  with check (true);

create policy "Anyone can read their own booking by reference"
  on booking_requests for select
  to anon
  using (true);
