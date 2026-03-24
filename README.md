# StreamForge

Production-ready legal streaming-style content catalog built with Next.js App Router, Prisma, PostgreSQL, and Tailwind.

## Legal & Safety Design
- **No scraping** of unauthorized sources.
- **No proxying, downloading, or rehosting** of copyrighted videos.
- Episode playback uses **admin-approved third-party embed URLs only**.

## Tech Stack
- Next.js 15 + App Router + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth (credentials; OAuth-ready model)

## Project Structure
```
app/
  (public)/
    page.tsx
    browse/page.tsx
    shows/[slug]/page.tsx
    watch/[showSlug]/[episodeNumber]/page.tsx
    auth/login/page.tsx
    auth/register/page.tsx
    profile/page.tsx
  admin/
    page.tsx
    shows/new/page.tsx
    episodes/new/page.tsx
    users/page.tsx
  api/
    auth/[...nextauth]/route.ts
    auth/register/route.ts
    episodes/route.ts
    bookmarks/route.ts
    watch-progress/route.ts
    ratings/route.ts
    search/route.ts
  sitemap.ts
  robots.ts
components/
  admin/show-form.tsx
  forms/login-form.tsx
  forms/register-form.tsx
  layout/navbar.tsx
  layout/footer.tsx
  show/hero-carousel.tsx
  show/show-card.tsx
  show/show-rail.tsx
  watch/watch-player.tsx
lib/
  auth/
  db/
  security/
  validation/
modules/
  shows/queries.ts
  admin/actions.ts
prisma/
  schema.prisma
  seed.ts
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env:
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
4. Run migrations:
   ```bash
   npm run prisma:migrate -- --name init
   ```
5. Seed demo data:
   ```bash
   npm run prisma:seed
   ```
6. Start dev:
   ```bash
   npm run dev
   ```

## Deploy (Vercel)
1. Push to Git provider.
2. Create Postgres DB (Neon/Supabase/Railway).
3. Set env vars in Vercel.
4. Configure build command: `npm run build`.
5. Set post-deploy command: `npx prisma migrate deploy && npm run prisma:generate`.

## Future-ready extensions
- comments module
- notifications
- subscriptions
- PWA + mobile app API
- recommendation engine enhancements
- i18n UI
