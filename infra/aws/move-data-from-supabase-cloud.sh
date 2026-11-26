#!/bin/bash
# Run ON the Kathavi AWS server (Session Manager):  sudo bash /root/move.sh
# Copies Kathavi only (auth users + vx_* tables, functions, policies, storage bucket) from Supabase cloud.
# Swara's tables (avatars, vlogs, voices) are left behind. Asks for the DB password; nothing is saved to disk.
set -euo pipefail
REF=ilahbbmwdqvbugjtwcyj
read -rsp "Supabase database password: " PW; echo
WORK=$(mktemp -d /root/kathavi-move.XXXX); chmod 700 "$WORK"; trap 'rm -rf "$WORK"' EXIT
IMG=postgres:17
run() { docker run --rm --network host -e PGPASSWORD="$PW" -e PGSSLMODE=require -v "$WORK":/w "$IMG" "$@"; }
HOST=""
for h in aws-1-ap-south-1.pooler.supabase.com aws-0-ap-south-1.pooler.supabase.com; do
  if run psql -h "$h" -p 5432 -U "postgres.$REF" -d postgres -Atc "select 1" >/dev/null 2>&1; then HOST=$h; break; fi
done
[ -n "$HOST" ] || { echo "Could not connect - check the password and try again."; exit 1; }
C=(-h "$HOST" -p 5432 -U "postgres.$REF" -d postgres)
echo "1/5 Connected to Supabase cloud ($HOST). Dumping users..."
run pg_dump "${C[@]}" --data-only --no-owner --table=auth.users --table=auth.identities -f /w/auth.sql
echo "2/5 Dumping Kathavi tables, functions and policies (skipping Swara's)..."
run pg_dump "${C[@]}" --schema=public --no-owner \
  --exclude-table=public.avatars --exclude-table=public.vlogs --exclude-table=public.voices -f /w/public.sql
sed -i -e '/^SET transaction_timeout/d' -e '/^CREATE SCHEMA public;/d' -e '/^COMMENT ON SCHEMA public/d' \
  -e '/^\\restrict/d' -e '/^\\unrestrict/d' "$WORK/auth.sql" "$WORK/public.sql"
cat > "$WORK/storage.sql" <<'SQL'
insert into storage.buckets(id,name,public,file_size_limit) values('viralos','viralos',false,52428800) on conflict do nothing;
drop policy if exists vx_store_sel on storage.objects; drop policy if exists vx_store_ins on storage.objects;
drop policy if exists vx_store_upd on storage.objects; drop policy if exists vx_store_del on storage.objects;
create policy vx_store_sel on storage.objects for select to authenticated using (bucket_id='viralos' and public.vx_is_member(((storage.foldername(name))[1])::uuid));
create policy vx_store_ins on storage.objects for insert to authenticated with check (bucket_id='viralos' and public.vx_can_write(((storage.foldername(name))[1])::uuid));
create policy vx_store_upd on storage.objects for update to authenticated using (bucket_id='viralos' and public.vx_can_write(((storage.foldername(name))[1])::uuid));
create policy vx_store_del on storage.objects for delete to authenticated using (bucket_id='viralos' and public.vx_can_write(((storage.foldername(name))[1])::uuid));
SQL
echo "3/5 Safety backup of the AWS database first..."
/usr/local/bin/kathavi-backup
echo "4/5 Restoring into the AWS database..."
for f in auth public storage; do
  docker cp "$WORK/$f.sql" supabase-db:/tmp/$f.sql
  docker exec supabase-db psql -U postgres -d postgres -q -v ON_ERROR_STOP=1 -f /tmp/$f.sql
  docker exec supabase-db rm -f /tmp/$f.sql
done
docker restart supabase-rest >/dev/null
echo "5/5 Checking..."
docker exec supabase-db psql -U postgres -d postgres -Atc "select 'users: '||count(*) from auth.users union all select 'kathavi tables: '||count(*) from information_schema.tables where table_schema='public' and table_name like 'vx_%' union all select 'other tables: '||count(*) from information_schema.tables where table_schema='public' and table_name not like 'vx_%' union all select 'admin rows: '||count(*) from public.vx_admins union all select 'ledger rows: '||count(*) from public.vx_ledger union all select 'bucket: '||count(*) from storage.buckets where id='viralos'"
echo "DONE - Kathavi data is now on AWS."
