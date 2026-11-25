-- Only the payment webhook path (vx_complete_payment, vx_price) is callable while signed out.
do $$ declare f record; begin
  for f in select p.oid::regprocedure sig, p.proname from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname like 'vx\_%' loop
    execute format('revoke execute on function %s from public, anon', f.sig);
    if f.proname in ('vx_complete_payment','vx_price') then execute format('grant execute on function %s to anon, authenticated', f.sig);
    else execute format('grant execute on function %s to authenticated', f.sig); end if;
  end loop; end $$;
create policy priv_none on public.vx_private for select to authenticated using (false);
