# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build (also type-checks)
npm run lint     # ESLint
npm run start    # Serve production build locally
```

There are no automated tests. Type checking runs implicitly via `next build`.

## Architecture

This is a **Next.js 14 App Router** artist portfolio site for Anastasia Olehova, backed by **Sanity CMS** and styled with **Tailwind CSS**.

### Data Layer

All Sanity access goes through `src/lib/sanity.ts`:
- `client` — the Sanity client (no CDN, `apiVersion: '2024-01-01'`)
- `urlFor(source)` — Sanity image URL builder; always call `.url()` at the end
- `queries` — centralized GROQ queries for all content types

Pages fetch data directly in async Server Components. Every page uses `export const revalidate = 60` for ISR (60-second stale-while-revalidate). Errors in Sanity fetches are caught and return empty state rather than throwing.

Required environment variables (see `.env.example`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — `da3pwhay`
- `NEXT_PUBLIC_SANITY_DATASET` — `production`
- `SANITY_API_TOKEN` — only needed for mutations

### Sanity Schemas (`sanity/schemas/`)

Four document types:
- **artwork** — paintings/illustrations; fields: `title`, `slug`, `technique` (enum), `year`, `dimensions`, `image`, `description`, `price`, `available`, `featured`, `order`
- **doll** — art dolls; fields: `title`, `slug`, `material`, `height`, `images` (array), `description`, `available`, `price`, `order`
- **exhibition** — shows; fields: `title`, `type`, `venue`, `city`, `country`, `dateStart`, `dateEnd`, `description`, `image`, `upcoming`
- **about** — singleton document (`documentId: 'about'`); fields: `name`, `tagline`, `photo`, `bio`, `statement`, `education`, `awards`, `contacts`

The `technique` field on `artwork` uses string enum values: `watercolor`, `oil`, `graphics`, `mixed`, `ink`, `pastel`, `digital`. A `techniqueLabels` mapping (English key → Russian label) is currently duplicated in `page.tsx`, `portfolio/page.tsx`, `portfolio/[slug]/page.tsx`, and `PortfolioFilter.tsx` — consolidate into `src/lib/sanity.ts` if extending.

### Sanity Studio

Embedded at `/studio` via `src/app/studio/[[...tool]]/page.tsx` using `next-sanity`. The studio layout is separate (`layout.tsx` in the same folder) and excludes the site Header/Footer.

### Routing (App Router)

```
src/app/
  page.tsx               — Home (featured artworks + teasers)
  about/page.tsx         — Artist bio
  portfolio/
    page.tsx             — Full portfolio with client-side technique filter
    [slug]/page.tsx      — Individual artwork detail
  dolls/page.tsx         — Art dolls gallery
  exhibitions/page.tsx   — Exhibition history
  contact/
    page.tsx             — Contact page
    ContactForm.tsx      — Client component for the contact form
  studio/[[...tool]]/    — Embedded Sanity Studio
```

### Design System

The visual identity is "old museum / antique book illustration." All conventions are in `globals.css` and `tailwind.config.ts`:

**Tailwind custom colors:**
- `parchment` `#F5F0E8` — page background
- `parchment-dark` `#E8E0CC` — section variant
- `ink` `#1C1410` — primary text
- `ink-light` `#3D2B1F` — secondary text
- `crimson` `#8B2E2E` — accent / CTA
- `gold` `#C9A84C` — ornamental accent

**Fonts:** Cormorant Garamond (headings, labels, nav) and Lora (body text), both loaded from Google Fonts in `globals.css`.

**CSS component classes (defined in `globals.css` `@layer components`):**
- `page-container` — max-width 1200px centered wrapper
- `section-title` — fluid heading style
- `btn-primary` — crimson-bordered button
- `btn-gold` — gold-bordered button
- `nav-link` — header navigation link with underline animation
- `card-artwork` — artwork card with gold border and hover lift
- `card-museum` / `card-museum-overlay` — hover-reveal overlay card
- `divider-ornament` — gold ornamental divider with flanking lines
- `prose-art` — Lora body text style
- `frame-ornate` — double-border decorative frame
- `hr-ornate` — gradient gold rule

**Shared UI components (`src/components/`):**
- `layout/Header.tsx` — fixed header, transparent until scroll, mobile hamburger (client component)
- `layout/Footer.tsx` — site footer
- `ui/Ornament.tsx` — `OrnamentDivider`, `SectionHeader`, `CornerOrnament`
- `ui/PortfolioFilter.tsx` — client-side technique filter for the portfolio grid

### Images

All images are served from Sanity's CDN (`cdn.sanity.io`). The Next.js `remotePatterns` config in `next.config.mjs` permits only `https://cdn.sanity.io/images/**`. Always use `urlFor(source).width(N).url()` and pass meaningful `sizes` to `next/image`.

### Deployment

Deployed on Vercel (`vercel.json` sets framework to `nextjs`). The hero image is fetched by slug `angelochek` — this specific artwork must exist in Sanity for the home page hero to render.
