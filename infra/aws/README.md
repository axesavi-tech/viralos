# Kathavi on AWS — full migration runbook

Everything runs in your own AWS account. No Vercel, no Supabase cloud, and no change to Kathavi's code.

| Piece | AWS service | Notes |
|---|---|---|
| Web app (Next.js) | **AWS Amplify Hosting** | Deploys from GitHub on every push, like Vercel |
| Database, sign-in, file storage, admin dashboard | **Self-hosted Supabase on EC2** (open source) | Same Postgres tables, security rules and login flow as today |
| HTTPS for `api.kathavi.com` | Caddy on the server | Free certificate, auto-renewing |
| Sign-in emails (magic links, confirmations) | **Amazon SES** | Sends from `hello@kathavi.com` |
| Backups | **S3** (daily database dump + files) and **daily disk snapshots** | Dumps kept 35 days, snapshots 14 |
| Secrets | **SSM Parameter Store** | Generated on the server; never in git |
| DNS | **Route 53** | Domain stays registered at Vercel for now (see step 7) |

Use the **Asia Pacific (Mumbai) ap-south-1** region for everything (top-right region picker in the console).

---

## 1. Email sending (Amazon SES) — 10 min, then wait for approval
1. Console → **Amazon SES** → *Identities* → **Create identity** → Domain → `kathavi.com`. Add the DNS records it shows (Route 53 can add them automatically after step 2).
2. SES → *SMTP settings* → **Create SMTP credentials**. Save the username and password.
3. SES → *Account dashboard* → **Request production access** (new accounts can only email verified addresses until approved).

## 2. DNS (Route 53)
1. Console → **Route 53** → *Hosted zones* → **Create hosted zone** → `kathavi.com`.
2. Copy its 4 name servers. In Vercel → Domains → kathavi.com → **Nameservers** → set them to these four.
3. Note the **Hosted zone ID** (starts with `Z…`).

## 3. Create the server stack (CloudFormation) — ~15 min
1. Console → **CloudFormation** → **Create stack** → *Upload a template file* → `infra/aws/kathavi-stack.yml`.
2. Stack name `kathavi`. Fill in:
   - `HostedZoneId` = the Z… ID from step 2 (creates `api.kathavi.com` automatically)
   - `SmtpHost` = `email-smtp.ap-south-1.amazonaws.com`, `SmtpUser` / `SmtpPass` = from step 1
   - leave the rest as defaults (`t3.large`, 60 GB)
3. Tick the IAM acknowledgement → **Submit**. Wait for `CREATE_COMPLETE`, then about **10 more minutes** while the server installs Supabase.
4. Check: open `https://api.kathavi.com` → you should get a login box (Supabase Studio). Username `admin`, password from **Systems Manager → Parameter Store → `/kathavi/supabase/dashboard-password`** (*Show decrypted value*).

## 4. Move your data from Supabase cloud
1. Supabase cloud dashboard → *Project Settings → Database* → copy the **Connection string (URI)** with your DB password.
2. AWS Console → **EC2** → *Instances* → `kathavi-supabase` → **Connect** → *Session Manager* → **Connect**.
3. In that browser terminal:
   ```bash
   sudo -i
   curl -fsSL -o move.sh https://raw.githubusercontent.com/axesavi-tech/viralos/main/infra/aws/move-data-from-supabase-cloud.sh   # or paste the script
   bash move.sh 'postgresql://postgres:YOUR_PASSWORD@db.YOURPROJECT.supabase.co:5432/postgres'
   ```
   It copies every user (your admin account keeps the same ID, so the admin lock still works) and all Kathavi tables, policies and functions, then prints a check.
   *(The repo is private, so if `curl` fails, open the script on GitHub, copy it, and paste it into `nano move.sh`.)*
4. If you uploaded files to Supabase Storage, download them from the Supabase dashboard and re-upload them in Studio at `https://api.kathavi.com` → Storage.

## 5. The web app (Amplify)
1. Console → **AWS Amplify** → **Create new app** → GitHub → `axesavi-tech/viralos`, branch `main`. Amplify reads `amplify.yml` from the repo.
2. *Environment variables* → add:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://api.kathavi.com`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = value of `/kathavi/supabase/anon-key` in Parameter Store
   - `NEXT_PUBLIC_SITE_URL` = `https://kathavi.com`
   - the same keys you had on Vercel: `VX_SERVER_SECRET`, `VX_ENCRYPTION_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `FAL_KEY`, `RUNWAYML_API_SECRET`, `ELEVENLABS_API_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `META_APP_ID`, `META_APP_SECRET`
   - **`VX_ENCRYPTION_KEY` must be the same value as before**, or saved store connections cannot be decrypted.
3. **Save and deploy.** Test on the temporary `https://main.xxxx.amplifyapp.com` address: sign in, open the studio, render a template.

## 6. Switch kathavi.com to AWS
1. Amplify → *Hosting → Custom domains* → **Add domain** → `kathavi.com` (Route 53 zone is detected; tick `www` too). Amplify issues the certificate and creates the records.
2. Update outside services to the same URLs (they don't change, but re-check):
   Razorpay/Stripe webhooks → `https://kathavi.com/api/billing/...`; Meta app redirect URLs; Shopify app URLs.
3. Sign in on `https://kathavi.com` and confirm the admin console opens for `axesavi@gmail.com`.

## 7. Turn off the old services (after a few days of everything working)
- Vercel: delete the `kathavi` project. The **domain registration** must stay at Vercel until **24 Jan 2027** (registrars lock new domains for 60 days), then transfer it to Route 53 (*Route 53 → Registered domains → Transfer in*).
- Supabase cloud: download a final backup, then pause/delete the project.

---

## Running it
- **Admin shell:** EC2 → instance → Connect → Session Manager (no SSH keys, no open ports).
- **Logs:** `/var/log/kathavi-setup.log` (first boot), `/var/log/kathavi-backup.log`, `cd /opt/supabase && docker compose logs -f auth`.
- **Manual backup now:** `sudo /usr/local/bin/kathavi-backup`.
- **Restore:** download a `db/kathavi-YYYY-MM-DD.sql.gz` from the backup bucket and `gunzip -c file | docker exec -i supabase-db psql -U postgres`.
- **Update Supabase (monthly):** `cd /opt/supabase-src && git pull && cp -r docker/docker-compose.yml /opt/supabase/ && cd /opt/supabase && docker compose pull && docker compose up -d` — take a snapshot first.
- **Cost (rough):** t3.large on-demand plus a 60 GB disk, Elastic IP, Amplify and small S3/SES use. Check the AWS Pricing Calculator for Mumbai, and consider a 1-year Savings Plan once traffic is steady.
