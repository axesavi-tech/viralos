#!/bin/bash
# Run on the Kathavi server (Session Manager):  sudo bash install.sh
# Needs the Anthropic key in SSM Parameter Store as /kathavi/app/anthropic-key (SecureString).
set -euo pipefail
R=$(curl -s http://169.254.169.254/latest/meta-data/placement/region || echo ap-south-1)
A=/usr/local/bin/aws
mkdir -p /opt/kathavi-worker && cd /opt/kathavi-worker
curl -fsSL -o worker.mjs https://raw.githubusercontent.com/axesavi-tech/viralos/main/infra/aws/ai-worker/worker.mjs
KEY=$($A ssm get-parameter --region "$R" --with-decryption --name /kathavi/app/anthropic-key --query Parameter.Value --output text)
PGPW=$($A ssm get-parameter --region "$R" --with-decryption --name /kathavi/supabase/postgres-password --query Parameter.Value --output text)
NET=$(docker inspect supabase-db -f '{{range $k,$v := .NetworkSettings.Networks}}{{$k}}{{end}}')
umask 077; printf 'ANTHROPIC_API_KEY=%s\nPGHOST=supabase-db\nPGPORT=5432\nPGUSER=postgres\nPGDATABASE=postgres\nPGPASSWORD=%s\n' "$KEY" "$PGPW" > worker.env
docker rm -f kathavi-ai-worker >/dev/null 2>&1 || true
docker run -d --name kathavi-ai-worker --restart unless-stopped --network "$NET" --env-file worker.env -v /opt/kathavi-worker:/app -w /app \
  --memory 256m node:22-alpine sh -c "[ -d node_modules/pg ] || npm i --no-save --no-audit --no-fund pg@8; exec node worker.mjs"
sleep 20; docker logs --tail 5 kathavi-ai-worker
