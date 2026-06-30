create table supplier_applications (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null,
  website text default '',
  area text not null,
  categories text[] default '{}',
  years_in_business integer default 0,
  description text not null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

alter table supplier_applications enable row level security;

create policy "Anyone can insert supplier applications"
  on supplier_applications for insert
  to anon
  with check (true);

create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table contact_messages enable row level security;

create policy "Anyone can insert contact messages"
  on contact_messages for insert
  to anon
  with check (true);
