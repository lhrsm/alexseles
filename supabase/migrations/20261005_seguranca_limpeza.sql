-- =============================================================================
-- Passo 2: correr SÓ depois de confirmar que o login novo do backoffice funciona.
-- Remove o que servia o login antigo feito no navegador.
-- =============================================================================
drop function if exists public.autenticar_admin(text, text);
drop function if exists public.revogar_sessao_admin(text);
drop function if exists public.obter_contatos_admin(text);
delete from public.admin_sessions;
alter table public.admin_users drop column if exists senha_hash;
