# B2B Blueprint Template

Next.js 15 (App Router) + Supabase + FastAPI scaffold. Follow the blueprint docs in the parent folder.

## Quick start

1. **Install dependencies**
   ```bash
   cd template
   npm install
   ```

2. **Environment**
   - Copy `.env.example` to `.env.local`.
   - For **Admin** (`/admin`): set `DATABASE_URI` to your Postgres URL (e.g. Supabase connection string). Without it, the admin will error when opening.
   - For local dev: set `INTERNAL_SERVICE_KEY=dev-secret-handshake` if you run the Python engine.

3. **Run Next.js**
   - **Development (recommended):** `npm run dev` → [http://localhost:3000](http://localhost:3000)
   - **Production:** Run from the **template** folder: `npm run clean`, then `npm run build`, then `npm start`. If you see "Cannot find module './8548.js'", run from the same directory that contains `.next` (the template folder) or use `npm run dev` instead.

4. **Run Python engine (optional)**
   ```bash
   cd services/python-engine
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```
   Then `POST /api/analyze` with `{ "fileUrl": "...", "orgId": "..." }` will hit the engine.

## Manual actions (when ready)

- **Step 0** (see `20 - External Services Setup.md`): Create Supabase project, enable pgvector, add buckets; GitHub + Vercel; OpenRouter; Stripe test mode + webhook.
- **Database**: Run the SQL from `03 - Database Schema & RLS Policies.txt` in Supabase.
- **Payload CMS**: Add when you need admin/CMS; configure `collections/` and `payload.config.ts`.

## Structure

- `app/(marketing)` — public SEO pages
- `app/(auth)` — login/signup (wire to Supabase)
- `app/(dashboard)` — reports, team, billing
- `app/api` — analyze, webhooks/stripe
- `lib/` — brand, python-client (add stripe, supabase, crypto-utils per blueprint)
- `components/ai/` — AITaskStatus, AIReportViewer, ReviewResultsDrawer (placeholders)
- `services/python-engine/` — FastAPI math service
- `collections/` — Payload collections (Users, Pages, ExternalIntegrations); `globals/SiteSettings` for SEO defaults
- **Admin:** `/admin` — Payload CMS. Requires **Postgres** (`DATABASE_URI` or `DATABASE_URL`). Use your Supabase connection string (Project Settings → Database). On first visit, create your first user.

Build the rest using **12 - Cursor Orchestration Plan.md**.
