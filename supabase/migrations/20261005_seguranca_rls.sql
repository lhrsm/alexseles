-- =============================================================================
-- Segurança do site alexseles.online: login pelo Supabase Auth + regras RLS
-- Correr no Supabase: SQL Editor -> colar -> Run.
-- Antes: criar a sua conta em Authentication -> Users -> Add user (Auto Confirm User).
-- =============================================================================

-- 1. Quem é administrador: email da sessão do Supabase Auth presente e ativo em admin_users
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and coalesce(status, 'Ativo') <> 'Inativo'
  );
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- 2. Garante que o email de administrador do site existe e está ativo
insert into public.admin_users (email, nome, perfil, status)
select 'alexseles40@gmail.com', 'Alex Seles', 'Administrador', 'Ativo'
where not exists (select 1 from public.admin_users where lower(email) = 'alexseles40@gmail.com');
update public.admin_users set status = 'Ativo' where lower(email) = 'alexseles40@gmail.com';

-- 3. Administradores: só um administrador autenticado vê ou altera
alter table public.admin_users enable row level security;
drop policy if exists "Admins gerem admins" on public.admin_users;
create policy "Admins gerem admins" on public.admin_users
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Sessões antigas (login feito no navegador): deixa de ser usada; sem políticas = ninguém acede pela chave pública
alter table public.admin_sessions enable row level security;

-- 4. Contactos: o formulário do site continua a gravar; só administradores leem, alteram ou apagam
drop policy if exists "Permitir leitura de contatos" on public.contatos;
drop policy if exists "Admins leem contatos" on public.contatos;
drop policy if exists "Admins alteram contatos" on public.contatos;
drop policy if exists "Admins apagam contatos" on public.contatos;
create policy "Admins leem contatos" on public.contatos
  for select to authenticated using (public.is_admin());
create policy "Admins alteram contatos" on public.contatos
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins apagam contatos" on public.contatos
  for delete to authenticated using (public.is_admin());
-- mantém-se: "Permitir envio de contatos por visitantes" (INSERT para anon)

-- 5. Artigos: o público só lê os publicados; só administradores escrevem
--    (a Beatriz do RP1 escreve pela ligação direta à base de dados, que não depende destas regras)
drop policy if exists "Permitir gerenciar artigos" on public.artigos;
drop policy if exists "Permitir leitura pública de artigos" on public.artigos;
drop policy if exists "Leitura de artigos publicados" on public.artigos;
drop policy if exists "Admins gerem artigos" on public.artigos;
create policy "Leitura de artigos publicados" on public.artigos
  for select to anon, authenticated using (status = 'Publicado' or public.is_admin());
create policy "Admins gerem artigos" on public.artigos
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- =============================================================================
-- REVERSÃO (só em caso de emergência; volta a abrir as tabelas como estavam):
-- drop policy if exists "Leitura de artigos publicados" on public.artigos;
-- drop policy if exists "Admins gerem artigos" on public.artigos;
-- create policy "Permitir leitura pública de artigos" on public.artigos for select to anon, authenticated using (true);
-- create policy "Permitir gerenciar artigos" on public.artigos for all to anon, authenticated using (true) with check (true);
-- drop policy if exists "Admins leem contatos" on public.contatos;
-- drop policy if exists "Admins alteram contatos" on public.contatos;
-- drop policy if exists "Admins apagam contatos" on public.contatos;
-- create policy "Permitir leitura de contatos" on public.contatos for select to anon, authenticated using (true);
-- drop policy if exists "Admins gerem admins" on public.admin_users;
-- alter table public.admin_users disable row level security;
-- alter table public.admin_sessions disable row level security;
-- drop function if exists public.is_admin();
-- =============================================================================
