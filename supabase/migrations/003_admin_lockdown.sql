-- Platform administration belongs to exactly one account: the owner (axesavi@gmail.com).
alter table public.vx_admins add constraint vx_admins_owner_only check (user_id = '9122ffcb-2717-4b7e-bdf4-99750e59b144'::uuid);
-- No client role may change or empty the admin list (or any Kathavi table) outside row-level security.
do $$ declare t record; begin
  for t in select tablename from pg_tables where schemaname='public' and tablename like 'vx\_%' loop
    execute format('revoke truncate, trigger, references on public.%I from anon, authenticated', t.tablename);
  end loop; end $$;
revoke insert, update, delete on public.vx_admins from anon, authenticated;
-- Admin actions (rate/price changes) are recorded in the audit log.
create policy aud_admin_ins on public.vx_audit for insert to authenticated with check (vx_is_admin() and user_id = auth.uid());
