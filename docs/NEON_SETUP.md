# Neon integration: Vercel + localhost

Use the same Neon project for production (Vercel) and development (localhost). The app reads `DATABASE_URL`, `NEON_AUTH_BASE_URL`, and `NEON_AUTH_COOKIE_SECRET`.

---

## 1. Neon project and connection string

1. Go to [neon.tech](https://neon.tech) and sign in (you already have an account).
2. Create a **new project** (or use an existing one). Choose region and Postgres version.
3. In the project → **Connection details** (or Dashboard).
4. Copy the **connection string** and ensure it ends with `?sslmode=require`.  
   This is your `DATABASE_URL` (e.g. `postgresql://user:pass@ep-xxx.region.neon.tech/neondb?sslmode=require`).

---

## 2. Enable Neon Auth

1. In the same Neon project, go to **Integrations** or **Auth** (Neon Auth).
2. **Enable Neon Auth**. Neon creates the `neon_auth` schema.
3. Copy the **Auth URL** → this is `NEON_AUTH_BASE_URL`.
4. Generate a **cookie secret** (min 32 characters), e.g.:
   - `openssl rand -base64 32` (terminal), or use a password generator.
   - Save it securely; this is `NEON_AUTH_COOKIE_SECRET`.

---

## 3. Vercel (production)

1. In **Vercel Dashboard** → your project → **Settings** → **Environment Variables**.
2. Add for **Production** (and **Preview** if you want):

   | Name | Value |
   |------|--------|
   | `DATABASE_URL` | Neon connection string (with `?sslmode=require`) |
   | `NEON_AUTH_BASE_URL` | Neon Auth URL from step 2 |
   | `NEON_AUTH_COOKIE_SECRET` | Your 32+ char cookie secret from step 2 |

3. **Optional:** Link Neon to Vercel so Vercel can inject `DATABASE_URL`:
   - Project → **Storage** or **Integrations** → connect **Neon** → authorize and select the same Neon project.
4. **Redeploy** so new env vars are applied (Deployments → … → Redeploy).

---

## 4. Localhost (development)

1. In the repo root, copy the example env file:
   - `cp .env.example .env.local` (or copy `.env.example` to `.env.local` manually).
2. Edit `.env.local` and set:

   | Name | Value |
   |------|--------|
   | `DATABASE_URL` | Same Neon connection string as in Vercel |
   | `NEON_AUTH_BASE_URL` | Same Neon Auth URL |
   | `NEON_AUTH_COOKIE_SECRET` | Same cookie secret (or a separate one for dev) |

3. Add other vars as needed (e.g. `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`). See `.env.example`.
4. Run `npm run dev`. The app will use Neon for DB and auth on localhost.

---

## 5. Optional: sync schema (Drizzle)

If you use Drizzle and custom tables:

- **Pull** schema from Neon (includes `neon_auth`): `npx drizzle-kit pull`
- **Generate** migrations: `npx drizzle-kit generate`
- **Apply** to Neon: `npx drizzle-kit migrate` (uses `DATABASE_URL` from `.env.local` or your shell).

See `docs/SCHEMA_SETUP.md` for details.

---

## Checklist

- [ ] Neon project created; connection string copied (`DATABASE_URL`)
- [ ] Neon Auth enabled; `NEON_AUTH_BASE_URL` and `NEON_AUTH_COOKIE_SECRET` set
- [ ] Vercel: same three env vars added; redeploy done
- [ ] Localhost: `.env.local` with same three vars; `npm run dev` works
