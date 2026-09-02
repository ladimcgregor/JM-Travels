# JM Travels — Website

A premium, mobile-first, SEO-ready website for JM Travels, built with [Astro](https://astro.build) + React
islands + Tailwind CSS v4, following the JM Travels Full Design System (Cormorant Garamond + Manrope, navy/gold/sand
palette) and the JM Travels website brief.

## Stack, and why

- **Astro** — ships almost no JavaScript by default, which is what a photography-heavy, SEO-critical, content-heavy
  site like this needs. Pages are static HTML at build time; only the enquiry forms hydrate as small React islands.
- **Content Collections** (`src/content/`) — trips, destinations, testimonials and journal articles are plain
  Markdown files with a type-checked schema (`src/content.config.ts`). This is the site's CMS: no database, no
  external service, no login — just files a non-technical person can edit (see "Editing content" below).
- **Tailwind CSS v4** — design tokens (colours, type scale, spacing, radii) are defined once in
  `src/styles/global.css` exactly per the design system, so every page draws from the same system.
- **Web3Forms** — powers every form (Bespoke Trip, Contact, Consultation, Visa Assistance, Referral) without needing
  a backend server. Free, includes spam protection, and is combined here with a honeypot field and client-side
  validation (zod).

## Getting started

```bash
npm install
cp .env.example .env   # then fill in real values — see below
npm run dev
```

Visit `http://localhost:4321`.

```bash
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
npx astro check   # type-check the project
```

## Before this goes live — replace these placeholders

Everything below lives in **one file**, [`src/config/site.ts`](src/config/site.ts), so there's one place to update:

- Founder's real name and a professional photo at `public/images/founder/founder-portrait.jpg`
- WhatsApp number and display phone number
- Real email address
- Instagram / TikTok links and handles
- Business location / serviced market

Also:

- **`.env`** — create it from `.env.example` and add a real [Web3Forms](https://web3forms.com) access key (free)
  and, optionally, a Google Analytics 4 Measurement ID. Without the Web3Forms key, forms show a friendly fallback
  message instead of silently failing — but no enquiry actually reaches you until it's set.
- **`astro.config.mjs`** — update `SITE_URL` to the real production domain (used for the sitemap and canonical URLs).
- **Photography** — every image on the site is currently a placeholder from Lorem Picsum (a stable placeholder
  image service), seeded so the same image shows consistently. The brief is explicit that photography is a core
  brand asset — replace these with real JM Travels / Founder / destination photography as it becomes available.
  Search the codebase for `picsum.photos` to find every spot.
- **Founder's travel history** — `src/content/destinations/*.md` currently has `founderVisited: false` on every
  destination because the real list of 10 countries wasn't available while building this. Set it to `true` on the
  ones the Founder has actually visited, and add more destination files for any that aren't listed yet. Until at
  least one is `true`, the homepage "Travel Experience" section shows an honest placeholder instead of guessing.
- **Testimonials** — `src/content/testimonials/` is intentionally empty (the brief is explicit: never fabricate
  testimonials). See `src/content/testimonials/README.txt` for the exact format to add real ones as they come in.
- **Legal pages** — Privacy Policy, Terms & Conditions and Cookie Policy are solid starting drafts, not a substitute
  for legal review in the jurisdiction(s) JM Travels operates in.
- **Trip pricing** — the three sample trips (Zanzibar, Dubai, Cape Town) don't show pricing (`startingPrice` is
  unset). Add it per trip once real pricing is confirmed, or leave it out to keep an enquiry-first flow.

## Editing content (no developer needed for routine updates)

Everything in `src/content/` is a folder of Markdown files with a "frontmatter" block (the `---`-delimited section
at the top) for structured fields, and a body below for freeform text/HTML.

| To add/edit… | Edit files in… | Notes |
|---|---|---|
| An organised trip | `src/content/trips/` | Copy an existing file, change the frontmatter and body. `featured: true` shows it on the homepage. |
| A destination | `src/content/destinations/` | `region` must be one of the six categories used on the Destinations page. |
| A testimonial | `src/content/testimonials/` | Only add real ones with the customer's permission — see the README.txt there. |
| A journal article | `src/content/journal/` | `category` must match one of the categories already in use (or add a new one to the schema in `src/content.config.ts`). |

After editing, run `npm run build` (or just `npm run dev` while working) — new files are picked up automatically,
no code changes required. Astro will flag a red error at build time if a required field is missing or misspelled,
which is intentional: it catches content mistakes before they reach the live site.

## What's already implemented against the brief

- Full sitemap: Home, About, Services (+ per-service pages), Organised Trips (+ per-trip pages), Bespoke Travel,
  Travel Consultations, Visa Assistance (with the required non-guarantee disclaimer), Destinations (+ per-destination
  pages), Travel Journal (+ articles), Testimonials, Contact, Refer a Friend, FAQs, and legal pages.
- WhatsApp as a first-class conversion channel: a persistent floating button site-wide, page-specific pre-filled
  messages (e.g. the Visa page pre-fills a visa-specific message), and a WhatsApp CTA alongside every form.
- Mobile-first responsive layout, keyboard-accessible navigation and forms, visible focus states, and
  `prefers-reduced-motion` support.
- SEO: per-page metadata, Open Graph/Twitter tags, canonical URLs, JSON-LD structured data (TravelAgency, Article,
  TouristTrip, TouristDestination, FAQPage), an auto-generated sitemap, and `robots.txt`.
- Security: form input validation + a spam honeypot, security headers in `public/_headers` (Netlify/Cloudflare
  Pages — see `vercel.json.example` if deploying to Vercel instead), no collection of sensitive documents, and
  secrets kept out of the repo via `.env`.
- Analytics-ready: adding a GA4 Measurement ID to `.env` turns on tracking sitewide with no code changes.
- Deliberately honest content: the Founder narrative distinguishes personal travel experience from JM Travels'
  own (not-yet-existing) trip history, and the Testimonials sections show an honest "building our track record"
  state instead of anything fabricated — per the brief's explicit instruction.

## Deploying

This builds to static files (`npm run build` → `dist/`), so it deploys anywhere: Cloudflare Pages, Netlify, Vercel,
or any static host. `public/_headers` is picked up automatically by Netlify and Cloudflare Pages for security
headers; for Vercel, rename `vercel.json.example` to `vercel.json`.

Remember to set the same environment variables (`PUBLIC_WEB3FORMS_KEY`, `PUBLIC_GA_MEASUREMENT_ID`) in your hosting
provider's dashboard — `.env` is git-ignored and never gets deployed.
