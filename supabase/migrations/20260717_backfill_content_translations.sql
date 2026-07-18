-- Multilingual CMS data. The original text columns remain the Spanish source
-- for backwards compatibility with existing records and admin search.
alter table public.articles
  add column if not exists translations jsonb not null default '{}'::jsonb,
  add column if not exists seo jsonb not null default '{}'::jsonb,
  add column if not exists image_alt_text jsonb not null default '{}'::jsonb;

alter table public.portfolio
  add column if not exists translations jsonb not null default '{}'::jsonb,
  add column if not exists seo jsonb not null default '{}'::jsonb,
  add column if not exists image_alt_text jsonb not null default '{}'::jsonb;

update public.portfolio
set translations = jsonb_set(
  translations,
  '{es}',
  jsonb_build_object(
    'title', coalesce(title, ''),
    'description', coalesce(description, ''),
    'location', coalesce(location, '')
  ),
  true
)
where not (translations ? 'es');

update public.articles
set translations = jsonb_set(
  translations,
  '{es}',
  jsonb_build_object(
    'title', coalesce(title, ''),
    'excerpt', coalesce(excerpt, ''),
    'category', coalesce(category, ''),
    'blocks', coalesce(blocks, '[]'::jsonb)
  ),
  true
)
where not (translations ? 'es');
