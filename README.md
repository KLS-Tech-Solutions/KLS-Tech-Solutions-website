# KLS Tech Solutions — Website

Corporate website for **KLS Tech Solutions**, an engineering-first technology company in Bengaluru, India building IoT systems with AI-driven capabilities and enterprise-grade security.

React 18 + TypeScript + Vite + Tailwind frontend, FastAPI backend.

---

## Quick start

You need **Node.js 18+** and **Python 3.10+**.

```bash
# 1 — Frontend
cd frontend
npm install
npm run dev          # http://localhost:8080

# 2 — Backend (in a second terminal)
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload      # http://localhost:8000
```

The site runs without the backend — only the contact form needs it.

---

## Project structure

```
KLSTechSolutions-main/
├── backend/
│   ├── app/
│   │   ├── main.py              FastAPI app, CORS, SPA fallback
│   │   ├── core/config.py       CORS origins, /api prefix
│   │   ├── api/                 Route handlers
│   │   └── services/            email_service.py (contact delivery)
│   ├── requirements.txt
│   └── .env.example             Copy to .env and fill in SMTP details
│
└── frontend/
    ├── public/                  Static assets, robots.txt, icons, OG image
    ├── scripts/
    │   └── generate-sitemap.mjs Runs automatically before every build
    └── src/
        ├── config/              site.ts (identity, nav, contact) · seo.ts (per-page meta)
        ├── content/             Page copy, separated from components
        ├── components/
        │   ├── common/          Logo · Section · SectionHeader · FeatureCard · Reveal · Pill · IconTile · Breadcrumbs
        │   ├── layout/          Navbar · Footer · Layout · LegalPage · ScrollToTop
        │   ├── sections/        HomeHero · PageHero · CtaBanner · FaqSection · ProcessSteps
        │   ├── seo/             Seo.tsx · JsonLd.tsx
        │   └── ui/              shadcn primitives (only the ones in use)
        ├── hooks/               useScrollReveal · useCountUp · use-toast · use-mobile
        ├── lib/                 schema.ts (JSON-LD) · validation.ts (zod) · utils.ts
        ├── pages/               One file per route
        └── index.css            Design tokens — the single source of colour truth
```

---

## Commands

Run from `frontend/`:

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload on port 8080 |
| `npm run build` | Regenerates the sitemap, then builds to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run typecheck` | TypeScript check, no output emitted |
| `npm run lint` | ESLint |
| `npm run sitemap` | Regenerates `public/sitemap.xml` on its own |

---

## Configuration

### Frontend

`frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:8000
```

Point this at your deployed backend URL in production.

### Backend

Copy `backend/.env.example` to `backend/.env` and fill it in. The contact form silently fails to deliver without `SMTP_PASSWORD` — Gmail needs an [App Password](https://myaccount.google.com/apppasswords), not the account password, and 2-Step Verification must be enabled first.

### Before you deploy

Two values are hard-coded to the production domain and need changing if yours differs:

- `SITE_URL` in `frontend/src/config/site.ts` — drives canonical URLs and Open Graph tags
- `SITE_URL` in `frontend/scripts/generate-sitemap.mjs`

Also add your production origin to `CORS_ORIGINS` in `backend/app/core/config.py`, which currently only allows localhost.

---

## Editing content

Content is deliberately separated from components, so copy changes don't require touching JSX.

| To change | Edit |
|---|---|
| Phone, email, Instagram, location | `src/config/site.ts` → `contactInfo` |
| Navigation and footer links | `src/config/site.ts` → `mainNav`, `footerNav` |
| Page titles and meta descriptions | `src/config/seo.ts` |
| Home page copy | `src/content/home.ts` |
| Services, industries, process | `src/content/services.ts` |
| Product details and specs | `src/content/products.ts` |
| Mission, vision, values | `src/content/about.ts` |
| Brand colours | `src/index.css` (the `:root` and `.dark` blocks) |

Adding a page means creating `src/pages/YourPage.tsx`, adding an entry to `pageMeta` in `src/config/seo.ts`, registering a lazy route in `src/App.tsx`, and adding the path to `scripts/generate-sitemap.mjs`.

---

## Design system

**The site is light mode only.** There is no theme toggle, no `.dark` block, and no `darkMode` strategy in the Tailwind config — so `dark:` variants aren't generated at all and can't creep back in by accident.

Colours are derived from the company logo and defined once as HSL channels in the `:root` block of `src/index.css`:

| Source colour | Hex | Role |
|---|---|---|
| Navy | `#04203F` | Body text, headings |
| Azure | `#20B0E8` | Primary actions (deepened to 35% lightness) |
| Silver | `#B8B8B8` | Borders, muted text |
| Lime | `#88C818` | Accent, used as sparingly as in the mark |

Azure is deepened from the logo's own lightness because at 52% L it measures 4.29:1 against white — just under the AA threshold. At 35% L it clears it. Lime is darkened considerably further: in the logo it's a fill colour on white, which is far too light to use as text.

Every text/background pair meets **WCAG AA (4.5:1)**, verified by measurement rather than by eye.

Animations run through one document-level `IntersectionObserver` (`useScrollReveal`) rather than one per component, and everything is disabled under `prefers-reduced-motion`.

### If you ever want dark mode back

Add `darkMode: ["class"]` to `tailwind.config.ts`, add a `.dark { … }` block to `src/index.css` overriding the same token names, and reinstate a theme provider. The token architecture already supports it — every component reads from CSS variables, so no component code would need to change.

---

## SEO / AEO / GEO

- **Per-page metadata** via `react-helmet-async` — unique title, description, canonical, Open Graph and Twitter tags per route, all driven from `src/config/seo.ts`.
- **Structured data** built in `src/lib/schema.ts`: `Organization`, `WebSite`, `BreadcrumbList`, `Service`, `Product`, `FAQPage`, `ContactPage`, `AboutPage`.
- **Sitemap** generated from the route list at build time, so it cannot drift.
- **robots.txt** explicitly allows GPTBot, ClaudeBot, PerplexityBot and Google-Extended — the content is written to be quoted accurately by AI assistants, and citations are qualified traffic.
- **FAQ blocks** on Home, Services, Products and About answer questions in the phrasing people actually use, with each answer written as a complete, self-contained statement so a snippet or an assistant can lift one without losing meaning.

No structured data makes an unverifiable claim. There are no review counts, aggregate ratings, employee numbers, founding dates or client logos anywhere in the markup, because none of those are established facts about the company today. The Smart Water Monitor is marked `PreOrder` with no price, which is what its actual R&D status supports.

---

## Deployment

### Frontend (Vercel or any static host)

Build command `npm run build`, output directory `dist`. `vercel.json` already handles SPA rewrites, security headers, and immutable caching for hashed assets.

### Backend + frontend together

`backend/app/main.py` serves `frontend/dist` automatically when it exists:

```bash
cd frontend && npm run build
cd ../backend && uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The whole site is then served from port 8000.

---

## Known items

- **`/api/theme` is no longer called.** The site has no theme switching, so the endpoint is dead. It still exists in `backend/app/api/theme.py` and is harmless — delete it (and its router registration in `main.py`) whenever you like.
- **Privacy and Terms are templates.** They describe what this site actually collects and both carry a visible review notice. Have a lawyer check them — particularly the liability and governing-law sections — then delete the `notice` prop from `src/pages/Privacy.tsx` and `src/pages/Terms.tsx`.
- **`/services` redirects to `/solutions`.** Navigation reads "Services" because that's the search term, while the URL is preserved so existing links and indexing survive. To flip it, swap the two paths in `src/App.tsx` and `src/config/site.ts`.
- **The contact form has no server-side rate limiting.** Client-side validation and a honeypot are in place, but a determined actor can post directly to the API. Add rate limiting (e.g. `slowapi`) before you publicise the endpoint.

---

## Verification status

Verified on the current tree: TypeScript compiles clean, ESLint reports zero errors, the production build succeeds, all internal links and anchors resolve, every page renders exactly one `<h1>` and one `<Seo>`, and all colour pairs measure at or above WCAG AA.

Not verified: rendered visual output and Lighthouse scores — the build environment had no browser available. Run `npm run preview` and check at mobile, tablet and desktop widths before shipping.
