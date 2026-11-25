# Kathavi

Kathavi is an AI content and marketing studio: brand profile, campaigns, reels, posts, carousels, stories, ads and product copy. It publishes to Instagram, creates paused Meta ads and syncs with your online store.

## Stack
- Next.js 15 (App Router) on Vercel
- Supabase: auth, Postgres with row-level security, storage bucket `viralos`. Shares the Swara project; every object is prefixed `vx_`.
- Claude (text, live web research), fal.ai (images and video), ElevenLabs (voice cloning and TTS)
- Razorpay (INR) and Stripe (USD) for credits and plans
- Meta Graph API (Instagram publishing; ads are always created **paused**)
- Store plug-ins: Shopify, WooCommerce, BigCommerce and Wix (two-way), plus any other platform through a product feed, CSV or JSON link (read-only, with CSV export)

The studio UI is in `public/studio/` and is served at `/app`. The API routes are in `app/api/`.

## Database
Apply in order in the Supabase SQL editor (already applied to project `ilahbbmwdqvbugjtwcyj`):
1. `supabase/migrations/001_viralos_core.sql`: replace `__VX_SERVER_SECRET_SHA256__` with `sha256(VX_SERVER_SECRET)` in hex. Only the hash is stored.
2. `supabase/migrations/002_viralos_grants.sql`

To make someone a platform admin: `insert into vx_admins(user_id) values('<auth user id>');`

## Environment
Copy `.env.example` and fill it in. `VX_SERVER_SECRET` must match the hash in the database, and `VX_ENCRYPTION_KEY` is 64 hex characters. Never commit either.

## Webhooks
- Razorpay: `https://<domain>/api/billing/razorpay/webhook` (events `payment.captured`, `order.paid`)
- Stripe: `https://<domain>/api/billing/stripe/webhook` (event `checkout.session.completed`)
- Meta OAuth redirect: `https://<domain>/api/meta/callback`
- Supabase Auth redirect URL: `https://<domain>/auth/callback`

## Store plug-ins
Product Catalogue → Your stores. Each platform has its own adapter in `lib/commerce.ts` (`connect`, `list`, `update`). To add another platform, add one adapter and its key to `PROVIDERS`, and allow it in the `vx_connections.provider` check constraint. Keys are encrypted with AES-256-GCM before they are stored, and nothing is written to a store without the user's approval.

## Tests
```
npm ci
node --conditions=react-server --import tsx tests/unit.test.mts
npx next build
```
