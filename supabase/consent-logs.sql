create extension if not exists pgcrypto;

create table if not exists public.consent_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  received_at timestamptz,
  action text not null check (action in ('initial', 'update', 'clear')),
  consent jsonb not null,
  previous_consent jsonb,
  consent_id text,
  source text,
  consent_version text,
  consent_timestamp bigint,
  page_url text,
  language text,
  ip text,
  user_agent text
);

alter table public.consent_logs add column if not exists consent_id text;
alter table public.consent_logs add column if not exists source text;

create index if not exists consent_logs_created_at_idx on public.consent_logs (created_at desc);
create index if not exists consent_logs_action_idx on public.consent_logs (action);
create index if not exists consent_logs_consent_id_idx on public.consent_logs (consent_id);

alter table public.consent_logs enable row level security;

revoke all on table public.consent_logs from anon, authenticated;

-- Only the server-side master key could read or write the table directly (live policy).
drop policy if exists service_role_all on public.consent_logs;
create policy service_role_all on public.consent_logs
  for all to service_role using (true) with check (true);

-- Consent logging from the browser with the publishable key (anon role).
-- Validates and trims the payload exactly like the former app/api/consent-log route;
-- received_at, ip and user_agent come from the request, never from the payload.
create or replace function public.log_consent(payload jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  req_headers jsonb := coalesce(nullif(current_setting('request.headers', true), '')::jsonb, '{}'::jsonb);
  req_origin text := req_headers->>'origin';
  raw_ip text;
  ip_parts text[];
  anonymized_ip text;
  consent_value jsonb;
  previous_value jsonb;
  consent_id_value jsonb;
  timestamp_text text;
begin
  -- Same guard as the route's CONSENT_LOG_ALLOWED_ORIGINS: the site, the Worker's preview hosts, local dev.
  if req_origin is null or not (
    req_origin in ('https://litkovskyi.de', 'http://localhost:3000', 'http://localhost:8787')
    or req_origin ~ '^https://([a-z0-9-]+-)?alitkovsky\.[a-z0-9-]+\.workers\.dev$'
  ) then
    raise exception 'origin not allowed' using errcode = '42501';
  end if;

  -- normalizeConsent(): keep only boolean necessary/functional/analytics/marketing.
  select jsonb_object_agg(key, value) into consent_value
  from jsonb_each(case when jsonb_typeof(payload->'consent') = 'object' then payload->'consent' else '{}'::jsonb end)
  where key in ('necessary', 'functional', 'analytics', 'marketing') and jsonb_typeof(value) = 'boolean';

  if consent_value is null then
    raise exception 'consent is required' using errcode = '22023';
  end if;

  select jsonb_object_agg(key, value) into previous_value
  from jsonb_each(case when jsonb_typeof(payload->'previousConsent') = 'object' then payload->'previousConsent' else '{}'::jsonb end)
  where key in ('necessary', 'functional', 'analytics', 'marketing') and jsonb_typeof(value) = 'boolean';

  -- payload.consentId || payload.consent_id (JS falsy values fall through).
  consent_id_value := payload->'consentId';
  if consent_id_value is null or consent_id_value in ('null', '""', 'false', '0') then
    consent_id_value := payload->'consent_id';
  end if;

  -- payload.timestamp ? Number(payload.timestamp) : null (non-integers become null instead of failing).
  timestamp_text := case jsonb_typeof(payload->'timestamp')
    when 'number' then nullif(payload->>'timestamp', '0')
    when 'string' then btrim(payload->>'timestamp')
  end;

  -- Client IP as set by Supabase's Cloudflare edge. A forged X-Forwarded-For becomes its
  -- first entry, while CF-Connecting-IP can't be forged (checked on 27 Sep 2026).
  raw_ip := req_headers->>'cf-connecting-ip';

  -- anonymizeIp(): IPv4 → last octet 0; IPv6 → last group 0000.
  if raw_ip is null or raw_ip = '' then
    anonymized_ip := null;
  elsif strpos(raw_ip, '.') > 0 and cardinality(string_to_array(raw_ip, '.')) = 4 then
    ip_parts := string_to_array(raw_ip, '.');
    anonymized_ip := ip_parts[1] || '.' || ip_parts[2] || '.' || ip_parts[3] || '.0';
  elsif strpos(raw_ip, ':') > 0 then
    ip_parts := string_to_array(raw_ip, ':');
    ip_parts[cardinality(ip_parts)] := '0000';
    anonymized_ip := array_to_string(ip_parts, ':');
  else
    anonymized_ip := raw_ip;
  end if;

  insert into public.consent_logs (
    action, consent, previous_consent, consent_version, consent_timestamp,
    page_url, language, consent_id, source, ip, user_agent, received_at
  ) values (
    case when payload->>'action' in ('initial', 'update', 'clear') then payload->>'action' else 'update' end,
    consent_value,
    previous_value,
    case when jsonb_typeof(payload->'version') = 'string' then payload->>'version' end,
    case when timestamp_text ~ '^-?[0-9]{1,18}$' then timestamp_text::bigint end,
    case when jsonb_typeof(payload->'pageUrl') = 'string' then left(payload->>'pageUrl', 2048) end,
    case when jsonb_typeof(payload->'language') = 'string' then left(payload->>'language', 16) end,
    case when jsonb_typeof(consent_id_value) = 'string' then left(consent_id_value #>> '{}', 64) end,
    case when jsonb_typeof(payload->'source') = 'string' then left(payload->>'source', 64) end,
    anonymized_ip,
    left(nullif(req_headers->>'user-agent', ''), 512),
    now()
  );
end;
$$;

-- Supabase's default privileges grant EXECUTE to anon and authenticated directly.
revoke all on function public.log_consent(jsonb) from public, anon, authenticated;
grant execute on function public.log_consent(jsonb) to anon;

-- Retention: consent records are kept for 3 years (Datenschutz 5.5).
create extension if not exists pg_cron with schema pg_catalog;
grant usage on schema cron to postgres;
grant all privileges on all tables in schema cron to postgres;
select cron.schedule(
  'consent-logs-retention',
  '23 3 * * *',
  $$delete from public.consent_logs where created_at < now() - interval '3 years'$$
);
