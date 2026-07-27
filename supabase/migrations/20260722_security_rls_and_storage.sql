-- Production security baseline for Golden Light Studio.
-- Review in a Supabase preview project before applying to production.
-- The frontend must never be treated as an authorization boundary.

create or replace function public.has_admin_permission(permission_name text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and (
        role = 'owner'
        or coalesce((permissions ->> permission_name)::boolean, false)
      )
  );
$$;

create or replace function public.is_studio_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and role = 'owner'
  );
$$;

revoke all on function public.has_admin_permission(text) from public;
revoke all on function public.is_studio_owner() from public;
grant execute on function public.has_admin_permission(text) to authenticated;
grant execute on function public.is_studio_owner() to authenticated;

alter table public.portfolio enable row level security;
alter table public.articles enable row level security;
alter table public.admin_users enable row level security;
alter table public.login_users enable row level security;

drop policy if exists "public reads active portfolio" on public.portfolio;
drop policy if exists "admins read all portfolio" on public.portfolio;
drop policy if exists "editors manage portfolio" on public.portfolio;
create policy "public reads active portfolio"
on public.portfolio for select to anon, authenticated
using (deleted = false);
create policy "admins read all portfolio"
on public.portfolio for select to authenticated
using (public.has_admin_permission('editPortfolio') or public.has_admin_permission('deletePortfolio'));
create policy "editors manage portfolio"
on public.portfolio for all to authenticated
using (public.has_admin_permission('editPortfolio') or public.has_admin_permission('deletePortfolio'))
with check (public.has_admin_permission('editPortfolio') or public.has_admin_permission('deletePortfolio'));

drop policy if exists "public reads active articles" on public.articles;
drop policy if exists "admins read all articles" on public.articles;
drop policy if exists "editors manage articles" on public.articles;
create policy "public reads active articles"
on public.articles for select to anon, authenticated
using (deleted = false);
create policy "admins read all articles"
on public.articles for select to authenticated
using (public.has_admin_permission('editArticles') or public.has_admin_permission('deleteArticles'));
create policy "editors manage articles"
on public.articles for all to authenticated
using (public.has_admin_permission('editArticles') or public.has_admin_permission('deleteArticles'))
with check (public.has_admin_permission('editArticles') or public.has_admin_permission('deleteArticles'));

drop policy if exists "users read their own admin profile" on public.admin_users;
drop policy if exists "owners manage admin profiles" on public.admin_users;
create policy "users read their own admin profile"
on public.admin_users for select to authenticated
using (user_id = auth.uid() or public.is_studio_owner());
create policy "owners manage admin profiles"
on public.admin_users for all to authenticated
using (public.is_studio_owner())
with check (public.is_studio_owner());

-- Direct browser reads of username/email lookup records are intentionally denied.
-- Admin login uses Supabase Auth email + password; user provisioning belongs in an owner-only Edge Function.
drop policy if exists "public login user lookup" on public.login_users;
drop policy if exists "authenticated login user lookup" on public.login_users;

alter table storage.objects enable row level security;

drop policy if exists "public reads studio media" on storage.objects;
drop policy if exists "admins upload studio media" on storage.objects;
drop policy if exists "admins update studio media" on storage.objects;
drop policy if exists "admins delete studio media" on storage.objects;
create policy "public reads studio media"
on storage.objects for select to anon, authenticated
using (bucket_id in ('portfolio-images', 'journal'));
create policy "admins upload studio media"
on storage.objects for insert to authenticated
with check (
  (bucket_id = 'portfolio-images' and public.has_admin_permission('editPortfolio'))
  or (bucket_id = 'journal' and public.has_admin_permission('editArticles'))
);
create policy "admins update studio media"
on storage.objects for update to authenticated
using (
  (bucket_id = 'portfolio-images' and public.has_admin_permission('editPortfolio'))
  or (bucket_id = 'journal' and public.has_admin_permission('editArticles'))
)
with check (
  (bucket_id = 'portfolio-images' and public.has_admin_permission('editPortfolio'))
  or (bucket_id = 'journal' and public.has_admin_permission('editArticles'))
);
create policy "admins delete studio media"
on storage.objects for delete to authenticated
using (
  (bucket_id = 'portfolio-images' and public.has_admin_permission('deletePortfolio'))
  or (bucket_id = 'journal' and public.has_admin_permission('deleteArticles'))
);

-- Acceptance checks to run after applying:
-- 1. anon can SELECT only records where deleted = false.
-- 2. authenticated non-admin cannot read admin_users/login_users or mutate CMS/storage.
-- 3. editor can only perform the actions granted in permissions.
-- 4. owner can manage admin profiles through a server-side create-user function.
