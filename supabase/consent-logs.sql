create extension if not exists pgcrypto;

create table if not exists public.consent_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  received_at timestamptz,
  action text not null check (action in ('initial', 'update', 'clear')),
  consent jsonb not null,
  previous_consent jsonb,
  consent_version text,
  consent_timestamp bigint,
  page_url text,
  language text,
  ip text,
  user_agent text
);

create index if not exists consent_logs_created_at_idx on public.consent_logs (created_at desc);
create index if not exists consent_logs_action_idx on public.consent_logs (action);

alter table public.consent_logs enable row level security;

revoke all on table public.consent_logs from anon, authenticated;
