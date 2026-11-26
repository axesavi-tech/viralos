#!/bin/bash
# Run ON the Kathavi AWS server (via SSM Session Manager) to copy everything from Supabase cloud:
# all users and sign-ins (so your admin account keeps its ID), every Kathavi table, policy and function.
#   sudo bash move-data-from-supabase-cloud.sh 'postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres'
set -euo pipefail
SRC="${1:?Pass the Supabase cloud connection string (Project Settings > Database > Connection string, URI)}"
WORK=/root/kathavi-move; mkdir -p "$WORK"; cd "$WORK"
PGIMG=postgres:17
echo "1/4 Dumping users from Supabase cloud..."
docker run --rm --network host -v "$WORK":/w $PGIMG pg_dump "$SRC" --data-only --no-owner \
  --table=auth.users --table=auth.identities -f /w/auth.sql
echo "2/4 Dumping the Kathavi schema and data..."
docker run --rm --network host -v "$WORK":/w $PGIMG pg_dump "$SRC" --schema=public --no-owner -f /w/public.sql
sed -i -e '/^SET transaction_timeout/d' -e '/^CREATE SCHEMA public;/d' -e '/^COMMENT ON SCHEMA public/d' auth.sql public.sql
echo "3/4 Restoring into the AWS database..."
docker cp auth.sql supabase-db:/tmp/auth.sql; docker cp public.sql supabase-db:/tmp/public.sql
docker exec supabase-db psql -U postgres -d postgres -v ON_ERROR_STOP=1 -f /tmp/auth.sql
docker exec supabase-db psql -U postgres -d postgres -v ON_ERROR_STOP=1 -f /tmp/public.sql
echo "4/4 Checking..."
docker exec supabase-db psql -U postgres -d postgres -Atc "select 'users: '||count(*) from auth.users union all select 'kathavi tables: '||count(*) from information_schema.tables where table_schema='public' and table_name like 'vx_%' union all select 'admin rows: '||count(*) from public.vx_admins"
echo "Done. Files from Supabase Storage (if any) must be copied separately - see README."
