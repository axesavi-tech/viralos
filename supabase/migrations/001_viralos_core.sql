-- VIRALOS core schema (lives alongside Swara's tables; every object is prefixed vx_)
-- __VX_SERVER_SECRET_SHA256__ is replaced at apply time with sha256(VX_SERVER_SECRET) in hex. Only the hash is stored.
create extension if not exists pgcrypto;

create table if not exists public.vx_workspaces(id uuid primary key default gen_random_uuid(), name text not null check (char_length(name) between 1 and 80), plan text not null default 'free', plan_until timestamptz, created_by uuid not null references auth.users(id) on delete cascade, created_at timestamptz not null default now());
create table if not exists public.vx_members(workspace_id uuid not null references public.vx_workspaces(id) on delete cascade, user_id uuid not null references auth.users(id) on delete cascade, role text not null check (role in ('owner','admin','brand_manager','creative_editor','marketing_manager','approver','analyst','viewer')), email text, created_at timestamptz not null default now(), primary key(workspace_id,user_id));
create index if not exists vx_members_user on public.vx_members(user_id);
create table if not exists public.vx_invites(id uuid primary key default gen_random_uuid(), workspace_id uuid not null references public.vx_workspaces(id) on delete cascade, email text not null, role text not null check (role in ('admin','brand_manager','creative_editor','marketing_manager','approver','analyst','viewer')), token text not null unique default encode(gen_random_bytes(24),'hex'), invited_by uuid references auth.users(id) on delete set null, created_at timestamptz not null default now(), accepted_at timestamptz);
create table if not exists public.vx_docs(workspace_id uuid not null references public.vx_workspaces(id) on delete cascade, id text not null check (char_length(id) <= 200), type text, data jsonb not null, updated_at timestamptz not null default now(), updated_by uuid, primary key(workspace_id,id));
create table if not exists public.vx_ledger(id bigserial primary key, workspace_id uuid not null references public.vx_workspaces(id) on delete cascade, delta integer not null, reason text not null, ref text unique, meta jsonb not null default '{}', created_by uuid, created_at timestamptz not null default now());
create index if not exists vx_ledger_ws on public.vx_ledger(workspace_id, created_at desc);
create table if not exists public.vx_jobs(id uuid primary key default gen_random_uuid(), workspace_id uuid not null references public.vx_workspaces(id) on delete cascade, kind text not null, provider text, status text not null default 'queued' check (status in ('queued','running','done','failed')), request jsonb not null default '{}', result jsonb, error text, credits integer not null default 0, charge_ref text, created_by uuid, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create index if not exists vx_jobs_ws on public.vx_jobs(workspace_id, created_at desc);
create table if not exists public.vx_connections(workspace_id uuid not null references public.vx_workspaces(id) on delete cascade, provider text not null check (provider in ('meta','shopify','woocommerce','bigcommerce','wix','feed')), label text, secret text, meta jsonb not null default '{}', updated_by uuid, updated_at timestamptz not null default now(), primary key(workspace_id,provider));
create table if not exists public.vx_payments(id uuid primary key default gen_random_uuid(), workspace_id uuid not null references public.vx_workspaces(id) on delete cascade, gateway text not null check (gateway in ('razorpay','stripe')), order_id text not null unique, product text not null, amount_minor integer not null, currency text not null, credits integer not null, plan text, status text not null default 'created' check (status in ('created','paid','failed')), created_by uuid, created_at timestamptz not null default now(), paid_at timestamptz, raw jsonb);
create table if not exists public.vx_settings(key text primary key, value jsonb not null, updated_at timestamptz not null default now());
create table if not exists public.vx_private(key text primary key, value text not null);
create table if not exists public.vx_admins(user_id uuid primary key references auth.users(id) on delete cascade);
create table if not exists public.vx_voices(id uuid primary key default gen_random_uuid(), workspace_id uuid not null references public.vx_workspaces(id) on delete cascade, el_voice_id text not null, name text not null, consent jsonb not null, created_by uuid, created_at timestamptz not null default now());
create table if not exists public.vx_audit(id bigserial primary key, workspace_id uuid references public.vx_workspaces(id) on delete cascade, user_id uuid, action text not null, meta jsonb not null default '{}', created_at timestamptz not null default now());

alter table public.vx_workspaces enable row level security; alter table public.vx_members enable row level security; alter table public.vx_invites enable row level security;
alter table public.vx_docs enable row level security; alter table public.vx_ledger enable row level security; alter table public.vx_jobs enable row level security;
alter table public.vx_connections enable row level security; alter table public.vx_payments enable row level security; alter table public.vx_settings enable row level security;
alter table public.vx_private enable row level security; alter table public.vx_admins enable row level security; alter table public.vx_voices enable row level security; alter table public.vx_audit enable row level security;

create or replace function public.vx_role(ws uuid) returns text language sql stable security definer set search_path=public as $$ select role from vx_members where workspace_id=ws and user_id=auth.uid() $$;
create or replace function public.vx_is_member(ws uuid) returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from vx_members where workspace_id=ws and user_id=auth.uid()) $$;
create or replace function public.vx_can_write(ws uuid) returns boolean language sql stable security definer set search_path=public as $$ select coalesce(vx_role(ws) not in ('viewer','analyst'),false) $$;
create or replace function public.vx_can_manage(ws uuid) returns boolean language sql stable security definer set search_path=public as $$ select coalesce(vx_role(ws) in ('owner','admin'),false) $$;
create or replace function public.vx_is_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from vx_admins where user_id=auth.uid()) $$;

create policy ws_sel on public.vx_workspaces for select to authenticated using (vx_is_member(id) or vx_is_admin());
create policy mem_sel on public.vx_members for select to authenticated using (vx_is_member(workspace_id) or vx_is_admin());
create policy inv_all on public.vx_invites for all to authenticated using (vx_can_manage(workspace_id)) with check (vx_can_manage(workspace_id));
create policy doc_sel on public.vx_docs for select to authenticated using (vx_is_member(workspace_id));
create policy doc_ins on public.vx_docs for insert to authenticated with check (vx_can_write(workspace_id));
create policy doc_upd on public.vx_docs for update to authenticated using (vx_can_write(workspace_id)) with check (vx_can_write(workspace_id));
create policy doc_del on public.vx_docs for delete to authenticated using (vx_can_write(workspace_id));
create policy led_sel on public.vx_ledger for select to authenticated using (vx_is_member(workspace_id) or vx_is_admin());
create policy job_sel on public.vx_jobs for select to authenticated using (vx_is_member(workspace_id) or vx_is_admin());
create policy job_ins on public.vx_jobs for insert to authenticated with check (vx_can_write(workspace_id) and created_by=auth.uid());
create policy job_upd on public.vx_jobs for update to authenticated using (vx_can_write(workspace_id)) with check (vx_can_write(workspace_id));
create policy con_sel on public.vx_connections for select to authenticated using (vx_is_member(workspace_id));
create policy con_ins on public.vx_connections for insert to authenticated with check (vx_can_manage(workspace_id) or vx_role(workspace_id)='brand_manager');
create policy con_upd on public.vx_connections for update to authenticated using (vx_can_manage(workspace_id) or vx_role(workspace_id)='brand_manager') with check (vx_can_manage(workspace_id) or vx_role(workspace_id)='brand_manager');
create policy con_del on public.vx_connections for delete to authenticated using (vx_can_manage(workspace_id));
create policy pay_sel on public.vx_payments for select to authenticated using (vx_is_member(workspace_id) or vx_is_admin());
create policy set_sel on public.vx_settings for select to anon, authenticated using (true);
create policy set_admin on public.vx_settings for all to authenticated using (vx_is_admin()) with check (vx_is_admin());
create policy adm_sel on public.vx_admins for select to authenticated using (user_id=auth.uid());
create policy voi_sel on public.vx_voices for select to authenticated using (vx_is_member(workspace_id));
create policy voi_ins on public.vx_voices for insert to authenticated with check (vx_can_write(workspace_id) and created_by=auth.uid());
create policy voi_del on public.vx_voices for delete to authenticated using (vx_can_write(workspace_id));
create policy aud_sel on public.vx_audit for select to authenticated using (vx_can_manage(workspace_id) or vx_is_admin());
create policy aud_ins on public.vx_audit for insert to authenticated with check (vx_is_member(workspace_id) and user_id=auth.uid());

create or replace function public.vx_bootstrap() returns uuid language plpgsql security definer set search_path=public as $$
declare ws uuid; em text := (select email from auth.users where id=auth.uid()); inv record;
begin
  if auth.uid() is null then raise exception 'not_signed_in'; end if;
  for inv in select * from vx_invites where lower(email)=lower(em) and accepted_at is null loop
    insert into vx_members(workspace_id,user_id,role,email) values(inv.workspace_id,auth.uid(),inv.role,em) on conflict do nothing;
    update vx_invites set accepted_at=now() where id=inv.id;
  end loop;
  select workspace_id into ws from vx_members where user_id=auth.uid() order by created_at limit 1;
  if ws is null then
    insert into vx_workspaces(name,created_by) values(coalesce(split_part(em,'@',1),'My')||'''s workspace',auth.uid()) returning id into ws;
    insert into vx_members(workspace_id,user_id,role,email) values(ws,auth.uid(),'owner',em);
    insert into vx_ledger(workspace_id,delta,reason,ref,created_by) values(ws,coalesce((select (value->>'welcome')::int from vx_settings where key='plans'),100),'Welcome credits','welcome:'||ws,auth.uid());
  end if;
  return ws;
end $$;

create or replace function public.vx_set_role(ws uuid, uid uuid, new_role text) returns void language plpgsql security definer set search_path=public as $$
begin
  if not vx_can_manage(ws) then raise exception 'forbidden'; end if;
  if new_role='owner' and vx_role(ws)<>'owner' then raise exception 'only_owner_can_transfer'; end if;
  if (select role from vx_members where workspace_id=ws and user_id=uid)='owner' and vx_role(ws)<>'owner' then raise exception 'cannot_change_owner'; end if;
  update vx_members set role=new_role where workspace_id=ws and user_id=uid;
end $$;
create or replace function public.vx_remove_member(ws uuid, uid uuid) returns void language plpgsql security definer set search_path=public as $$
begin
  if not vx_can_manage(ws) then raise exception 'forbidden'; end if;
  if (select role from vx_members where workspace_id=ws and user_id=uid)='owner' then raise exception 'cannot_remove_owner'; end if;
  delete from vx_members where workspace_id=ws and user_id=uid;
end $$;
create or replace function public.vx_rename_workspace(ws uuid, new_name text) returns void language plpgsql security definer set search_path=public as $$
begin if not vx_can_manage(ws) then raise exception 'forbidden'; end if; update vx_workspaces set name=new_name where id=ws; end $$;

create or replace function public.vx_balance(ws uuid) returns integer language plpgsql stable security definer set search_path=public as $$
begin if not (vx_is_member(ws) or vx_is_admin()) then raise exception 'forbidden'; end if; return coalesce((select sum(delta) from vx_ledger where workspace_id=ws),0); end $$;

create or replace function public.vx_charge(ws uuid, amount integer, reason text, ref text, meta jsonb default '{}') returns integer language plpgsql security definer set search_path=public as $$
declare bal integer;
begin
  if not vx_can_write(ws) then raise exception 'forbidden'; end if;
  if amount is null or amount < 0 or amount > 100000 then raise exception 'bad_amount'; end if;
  if amount = 0 then return coalesce((select sum(delta) from vx_ledger where workspace_id=ws),0); end if;
  perform 1 from vx_workspaces where id=ws for update;
  bal := coalesce((select sum(delta) from vx_ledger where workspace_id=ws),0);
  if bal < amount then raise exception 'insufficient_credits'; end if;
  insert into vx_ledger(workspace_id,delta,reason,ref,meta,created_by) values(ws,-amount,reason,ref,meta,auth.uid());
  return bal-amount;
end $$;

-- Refunds are server-only (same secret check as payments) so a client can't refund a charge that succeeded.
create or replace function public.vx_refund(ws uuid, charge_ref text, p_secret text) returns integer language plpgsql security definer set search_path=public as $$
declare c record;
begin
  if p_secret is null or encode(extensions.digest(p_secret,'sha256'),'hex') <> (select value from vx_private where key='server_secret_sha256') then raise exception 'forbidden'; end if;
  select * into c from vx_ledger where ref=charge_ref and workspace_id=ws and delta<0;
  if c is null then raise exception 'no_charge'; end if;
  insert into vx_ledger(workspace_id,delta,reason,ref,created_by) values(ws,-c.delta,'Refund: '||c.reason,'refund:'||charge_ref,auth.uid()) on conflict (ref) do nothing;
  return coalesce((select sum(delta) from vx_ledger where workspace_id=ws),0);
end $$;

create or replace function public.vx_grant_monthly(ws uuid) returns integer language plpgsql security definer set search_path=public as $$
declare w record; amt integer;
begin
  if not vx_is_member(ws) then raise exception 'forbidden'; end if;
  select * into w from vx_workspaces where id=ws;
  if w.plan='free' or w.plan_until is null or w.plan_until < now() then return 0; end if;
  amt := coalesce((select (value->'tiers'->w.plan->>'credits')::int from vx_settings where key='plans'),0);
  if amt>0 then insert into vx_ledger(workspace_id,delta,reason,ref) values(ws,amt,'Monthly credits: '||w.plan,'grant:'||ws||':'||to_char(now(),'YYYY-MM')) on conflict (ref) do nothing; end if;
  return amt;
end $$;

create or replace function public.vx_create_payment(ws uuid, gw text, order_id text, product text) returns jsonb language plpgsql security definer set search_path=public as $$
declare p jsonb; amt integer; cr integer; pl text; cur text;
begin
  if not vx_can_write(ws) then raise exception 'forbidden'; end if;
  select value->product into p from vx_settings where key='products';
  if p is null then raise exception 'unknown_product'; end if;
  cur := case when gw='stripe' then 'usd' else 'inr' end;
  amt := (p->>(case when gw='stripe' then 'usd_minor' else 'inr_minor' end))::int; cr := (p->>'credits')::int; pl := p->>'plan';
  insert into vx_payments(workspace_id,gateway,order_id,product,amount_minor,currency,credits,plan,created_by) values(ws,gw,order_id,product,amt,cur,cr,pl,auth.uid());
  return jsonb_build_object('amount_minor',amt,'currency',cur,'credits',cr,'plan',pl);
end $$;

create or replace function public.vx_price(product text, gw text) returns jsonb language sql stable security definer set search_path=public as $$
  select jsonb_build_object('amount_minor',(value->product->>(case when gw='stripe' then 'usd_minor' else 'inr_minor' end))::int,'currency',case when gw='stripe' then 'usd' else 'inr' end,'name',value->product->>'name') from vx_settings where key='products' $$;

-- Called by the server only after it has verified the gateway's signature. Guarded by a secret no client can read.
create or replace function public.vx_complete_payment(p_order text, p_secret text, p_amount integer, p_raw jsonb) returns jsonb language plpgsql security definer set search_path=public as $$
declare pay record;
begin
  if p_secret is null or encode(extensions.digest(p_secret,'sha256'),'hex') <> (select value from vx_private where key='server_secret_sha256') then raise exception 'forbidden'; end if;
  select * into pay from vx_payments where order_id=p_order for update;
  if pay is null then raise exception 'unknown_order'; end if;
  if pay.status='paid' then return jsonb_build_object('status','already_paid'); end if;
  if p_amount <> pay.amount_minor then update vx_payments set status='failed', raw=p_raw where id=pay.id; raise exception 'amount_mismatch'; end if;
  update vx_payments set status='paid', paid_at=now(), raw=p_raw where id=pay.id;
  insert into vx_ledger(workspace_id,delta,reason,ref,meta) values(pay.workspace_id,pay.credits,'Purchase: '||pay.product,'pay:'||pay.order_id,jsonb_build_object('gateway',pay.gateway)) on conflict (ref) do nothing;
  if pay.plan is not null then
    update vx_workspaces set plan=pay.plan, plan_until=greatest(coalesce(plan_until,now()),now())+interval '30 days' where id=pay.workspace_id;
  end if;
  return jsonb_build_object('status','paid','credits',pay.credits);
end $$;

create or replace function public.vx_admin_adjust(ws uuid, amount integer, reason text) returns integer language plpgsql security definer set search_path=public as $$
begin if not vx_is_admin() then raise exception 'forbidden'; end if;
  insert into vx_ledger(workspace_id,delta,reason,created_by) values(ws,amount,'Admin: '||reason,auth.uid());
  insert into vx_audit(workspace_id,user_id,action,meta) values(ws,auth.uid(),'admin_adjust',jsonb_build_object('amount',amount,'reason',reason));
  return coalesce((select sum(delta) from vx_ledger where workspace_id=ws),0); end $$;

create or replace function public.vx_admin_overview() returns jsonb language plpgsql stable security definer set search_path=public as $$
begin if not vx_is_admin() then raise exception 'forbidden'; end if;
  return jsonb_build_object(
    'workspaces',(select coalesce(jsonb_agg(x order by x->>'created_at' desc),'[]') from (select jsonb_build_object('id',w.id,'name',w.name,'plan',w.plan,'plan_until',w.plan_until,'created_at',w.created_at,'members',(select count(*) from vx_members m where m.workspace_id=w.id),'owner',(select email from vx_members m where m.workspace_id=w.id and role='owner' limit 1),'balance',(select coalesce(sum(delta),0) from vx_ledger l where l.workspace_id=w.id),'spent_30d',(select coalesce(-sum(delta),0) from vx_ledger l where l.workspace_id=w.id and delta<0 and created_at>now()-interval '30 days')) x from vx_workspaces w) s),
    'revenue',(select coalesce(jsonb_agg(r),'[]') from (select currency, sum(amount_minor) minor, count(*) n from vx_payments where status='paid' group by currency) r),
    'failed_jobs',(select coalesce(jsonb_agg(j order by j->>'created_at' desc),'[]') from (select jsonb_build_object('id',id,'workspace_id',workspace_id,'kind',kind,'provider',provider,'error',error,'created_at',created_at) j from vx_jobs where status='failed' order by created_at desc limit 50) f),
    'usage',(select coalesce(jsonb_agg(u),'[]') from (select reason, count(*) n, -sum(delta) credits from vx_ledger where delta<0 and created_at>now()-interval '30 days' group by reason order by 3 desc limit 30) u));
end $$;

grant execute on function public.vx_complete_payment(text,text,integer,jsonb) to anon, authenticated;
revoke insert, update, delete on public.vx_ledger, public.vx_payments, public.vx_members, public.vx_workspaces, public.vx_admins from anon, authenticated;
revoke all on public.vx_private from anon, authenticated;

insert into public.vx_private(key,value) values('server_secret_sha256','__VX_SERVER_SECRET_SHA256__') on conflict (key) do update set value=excluded.value;
insert into public.vx_settings(key,value) values
('rates','{"dna":12,"strategy":15,"intel":10,"directions":10,"calendar":30,"fix":4,"regen":4,"copy":4,"ads":12,"catalogue":12,"advisor":8,"command":2,"scene":3,"studio_ai":6,"research":25,"web_read":2,"image":12,"video_5s":120,"avatar_10s":200,"voice_clone":30,"tts_1k":45,"publish":0,"ad_launch":0}'),
('plans','{"welcome":150,"tiers":{"creator":{"name":"Creator","credits":1000},"growth":{"name":"Growth","credits":2800},"professional":{"name":"Professional","credits":7000},"agency":{"name":"Agency","credits":18000}}}'),
('products','{"pack_500":{"name":"500 credits","credits":500,"inr_minor":49900,"usd_minor":699},"pack_2200":{"name":"2,200 credits","credits":2200,"inr_minor":199900,"usd_minor":2499},"pack_6000":{"name":"6,000 credits","credits":6000,"inr_minor":499900,"usd_minor":5999},"plan_creator":{"name":"Creator · 30 days","credits":1000,"plan":"creator","inr_minor":99900,"usd_minor":1299},"plan_growth":{"name":"Growth · 30 days","credits":2800,"plan":"growth","inr_minor":249900,"usd_minor":2999},"plan_professional":{"name":"Professional · 30 days","credits":7000,"plan":"professional","inr_minor":599900,"usd_minor":6999},"plan_agency":{"name":"Agency · 30 days","credits":18000,"plan":"agency","inr_minor":1499900,"usd_minor":17999}}'),
('providers','{"image_model_edit":"fal-ai/nano-banana/edit","image_model_text":"fal-ai/flux-pro/v1.1","video_model":"fal-ai/kling-video/v2.1/standard/image-to-video","avatar_model":"heygen/avatar-6/image-to-video","text_model":"claude-sonnet-5-5","text_model_complex":"claude-opus-5-5","text_model_quick":"claude-haiku-5-5"}')
on conflict (key) do nothing;

insert into storage.buckets(id,name,public,file_size_limit) values('viralos','viralos',false,52428800) on conflict do nothing;
create policy vx_store_sel on storage.objects for select to authenticated using (bucket_id='viralos' and public.vx_is_member(((storage.foldername(name))[1])::uuid));
create policy vx_store_ins on storage.objects for insert to authenticated with check (bucket_id='viralos' and public.vx_can_write(((storage.foldername(name))[1])::uuid));
create policy vx_store_upd on storage.objects for update to authenticated using (bucket_id='viralos' and public.vx_can_write(((storage.foldername(name))[1])::uuid));
create policy vx_store_del on storage.objects for delete to authenticated using (bucket_id='viralos' and public.vx_can_write(((storage.foldername(name))[1])::uuid));
