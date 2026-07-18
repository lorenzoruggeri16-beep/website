-- Run once in the Supabase SQL editor (or through the migration runner).
-- Static interface copy remains in src/i18n; post/session copy lives with each record.
alter table public.articles
  add column if not exists translations jsonb not null default '{}'::jsonb;

alter table public.portfolio
  add column if not exists translations jsonb not null default '{}'::jsonb;
