# B2B Blueprint

Next.js 15 (App Router) + Neon / Supabase + Drizzle + Payload. Follow the blueprint docs in **Instruction Cursor** (or parent folder).

## Quick start

1. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Environment**
   - Copy `.env.example` to `.env.local`.
   - Base stack: `DATABASE_URL` (Neon), `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, optional `BLOB_READ_WRITE_TOKEN`. See `/setup` and `docs/` in the repo.
   - For **Admin** (`/admin`): Postgres via `DATABASE_URL` or `DATABASE_URI`.

3. **Run**
   - **Development:** `npm run dev` → [http://localhost:3000](http://localhost:3000)
   - **Production:** `npm run build` then `npm start`

4. **Optional: Python engine**
   ```bash
   cd services/python-engine
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```
   Then `POST /api/analyze` with `{ "fileUrl": "...", "orgId": "..." }` hits the engine.

## Manual actions (when ready)

- **Setup:** Use the `/setup` page; link Neon, Vercel Blob, env vars. See `docs/DATABASE_OPTIONS.md`, `docs/SCHEMA_SETUP.md`.
- **Payload CMS:** Configure `collections/` and `payload.config.ts` when you need admin/CMS.

## Structure

- `app/(marketing)` — public SEO pages
- `app/(auth)` — login (Neon Auth or Supabase)
- `app/(dashboard)` — reports, AI (chat, reports, documents), team, billing
- `app/api` — auth, AI, contact, webhooks
- `lib/` — auth, db (Drizzle), AI, blob, Supabase, brand, SEO
- `components/` — ContactForm, AI components
- `collections/` — Payload (Users, Pages, ExternalIntegrations); `globals/SiteSettings`
- **Admin:** `/admin` — Payload CMS (requires Postgres).

If an old **template** folder still exists (leftover from before the move to root), you can delete it after closing any processes using it (e.g. dev server, IDE).
