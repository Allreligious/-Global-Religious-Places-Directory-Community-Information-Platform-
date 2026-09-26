-- Global Religious Places Directory
-- Initial PostgreSQL / Supabase schema

create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  website text,
  email text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists religious_places (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete set null,
  name text not null,
  tradition text not null,
  category text not null,
  description text,
  address_line1 text,
  city text not null,
  region text,
  postal_code text,
  country text not null default 'Canada',
  latitude double precision,
  longitude double precision,
  website text,
  email text,
  phone text,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified','pending','verified')),
  source text,
  source_url text,
  last_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists religious_places_city_idx on religious_places(city);
create index if not exists religious_places_tradition_idx on religious_places(tradition);
create index if not exists religious_places_country_idx on religious_places(country);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  religious_place_id uuid not null references religious_places(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists service_times (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  religious_place_id uuid not null references religious_places(id) on delete cascade,
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  event_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_starts_at_idx on events(starts_at);

create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  religious_place_id uuid not null references religious_places(id) on delete cascade,
  image_url text not null,
  caption text,
  created_at timestamptz not null default now()
);

create table if not exists verification_requests (
  id uuid primary key default gen_random_uuid(),
  religious_place_id uuid not null references religious_places(id) on delete cascade,
  requester_name text,
  requester_email text,
  evidence_url text,
  message text,
  status text not null default 'pending'
    check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists update_requests (
  id uuid primary key default gen_random_uuid(),
  religious_place_id uuid not null references religious_places(id) on delete cascade,
  requester_name text,
  requester_email text,
  proposed_changes jsonb not null,
  message text,
  status text not null default 'pending'
    check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  religious_place_id uuid not null references religious_places(id) on delete cascade,
  reporter_email text,
  reason text not null,
  details text,
  status text not null default 'open'
    check (status in ('open','reviewed','resolved')),
  created_at timestamptz not null default now()
);

-- Useful first seed: the platform's initial geographic focus.
insert into religious_places (
  name, tradition, category, city, region, country, description
) values
  ('Calgary Community Place', 'Islam', 'Mosque', 'Calgary', 'Alberta', 'Canada',
   'Initial MVP placeholder record for development.'),
  ('Calgary Faith Centre', 'Christianity', 'Church', 'Calgary', 'Alberta', 'Canada',
   'Initial MVP placeholder record for development.'),
  ('Calgary Hindu Centre', 'Hinduism', 'Temple', 'Calgary', 'Alberta', 'Canada',
   'Initial MVP placeholder record for development.'),
  ('Calgary Sikh Community Centre', 'Sikhism', 'Gurdwara', 'Calgary', 'Alberta', 'Canada',
   'Initial MVP placeholder record for development.')
on conflict do nothing;
