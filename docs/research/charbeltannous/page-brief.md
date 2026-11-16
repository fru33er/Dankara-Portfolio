# Charbel Tannous — Portfolio Clone Brief

## Source
- **URL**: https://charbeltannous.com/
- **Title**: Charbel Tannous — Software Engineer
- **Tech**: TanStack Router, GSAP, Matter.js (physics), Convex (real-time), custom theming engine
- **Font**: JetBrains Mono Variable (mono), Inter (body), Outfit (display) — loaded via Google Fonts CSS
- **Not Framer**: Custom React app with TanStack Start

## Theming System
The site has an elaborate theming system with:
- **Houses** (design presets): classic, heng, kirk, riso, russet, pop, nile
- **Inks** (time-of-day): morning, day, dusk, night — auto-selected by hour
- **Generated themes**: users can type a "mood" to restyle the site

For the clone we implement **classic house** with all 4 ink variants (day as default).

## Color Tokens (classic/day)
- `--background`: #f8ed43 (bright yellow)
- `--foreground`: #111314 (near-black)
- `--text-heading`: #134a2a (dark green)
- `--text-label`: #a50e2c (dark red)
- `--text-body`: #111314
- `--text-subtle`: #4a4720
- `--surface-page`: #f8ed43
- `--surface-accent-1`: #1a7444 (green)
- `--surface-accent-2`: #cc1236 (red)
- `--surface-accent-3`: #111314 (dark)
- `--surface-accent-4`: #a50e2c (dark red)
- `--rule`: #111314 (border color)
- `--brand`: #cc1236

## Typography Tokens
- `--font-display`: Inter, system-ui, sans-serif (with Outfit for display)
- `--font-body`: Inter, system-ui, sans-serif
- `--font-label` / mono: JetBrains Mono Variable
- `--type-hero`: clamp(3.2rem, .57rem + 8.24vw, 12rem)
- `--type-work`: clamp(2.5rem, 6vw, 6rem)
- `--type-h2`: clamp(1.5rem, 1.1rem + 1.71vw, 2.8125rem)
- `--type-body`: clamp(1rem, .885rem + .49vw, 1.375rem)
- `--type-caption`: .75rem
- `--type-label`: .9375rem

## Spacing Tokens
- `--space-section`: clamp(6rem, 12vw, 12rem)
- `--space-block`: clamp(2rem, 4vw, 4rem)
- `--space-inline`: clamp(1.25rem, 3vw, 3rem)
- `--space-row`: clamp(1.5rem, 2.5vw, 2.25rem)

## Motion Tokens
- `--motion-duration`: .6s
- `--motion-ease`: cubic-bezier(.34, 1.56, .64, 1)
- `--transition-duration`: .55s
- `--transition-ease`: cubic-bezier(.22, 1, .36, 1)

## Sections (top to bottom)

### 1. Hero Section (`data-anchor="hero"`)
- Large heading: "Charbel Tannous" in display font at hero size
- Subtitle: "Software engineer in Montreal, Canada..."
- Navigation links as floating elements
- Background: yellow (#f8ed43)
- Physics playground: balls fall through the page (Matter.js) — **defer for v2**

### 2. Signature / About Section
- Contains a tagline about the person
- GSAP scroll-reveal animations
- Monospace labels, display headings

### 3. Work / Portfolio Section (`data-anchor="work"`)
- Ordered list of projects:
  1. **StreetCore** — 2026, Technical Co-Founder (TypeScript, React, TanStack Start, Drizzle, PostgreSQL, Cloudflare R2)
  2. **Spolio** — 2026, Founder & Engineer (React, TanStack Start, Convex, Gemini Vision, Cloudflare AI Gateway)
  3. **Anghami** — 2025, Android Engineering Intern (Kotlin, Jetpack Compose, Hilt, StateFlow)
  4. **Statbox** — 2025, Software Engineer (React Native, Expo, React, Tailwind, shadcn/ui)
  5. **Healthcare ML** — 2023, Machine Learning Intern (Python, PyTorch, scikit-learn, Ray Tune)
- Each row has: number, project name (display font), year, role, tech stack
- Hover shows project preview in sidebar (desktop)
- Links to `/work/streetcore`, `/work/spolio`, `/work/statbox`
- "View Full Résumé" link

### 4. Guestbook Section (`data-anchor="guestbook"`)
- Large counter heading: "X signatures on the wall"
- SVG canvas for drawing signatures — **simplified static version**
- Real-time via Convex — **static for clone**

### 5. Footer (drain metaphor)
- Floating "buoy" navigation pills: GITHUB ↗, LINKEDIN ↗, RÉSUMÉ ↗, ↑ TOP
- Links: github.com/charbel30, linkedin.com/in/charbeltannous, /charbel-tannous-resume.pdf
- Creative drain/water visual — **simplified**

## Interactions to Clone
- [x] Scroll-reveal animations (GSAP-driven, fade-up on sections)
- [x] Hover effects on work rows (scale up project name, show accent color)
- [x] Floating buoy hover (slight lift and rotate)
- [x] Responsive layout (stacked on mobile)
- [ ] Physics playground (Matter.js balls) — **defer**
- [ ] Custom cursor — **defer**
- [ ] Theme switching — **defer (use classic/day only)**
- [ ] Guestbook drawing — **defer**
- [ ] Page transitions — **defer**

## Route Map
| Source URL | Local Route | Files |
|---|---|---|
| https://charbeltannous.com/ | `/` (root) | `src/app/page.tsx`, `src/app/layout.tsx` |

## Asset Map
| Asset | Source URL | Local Path |
|---|---|---|
| JetBrains Mono Variable | /assets/jetbrains-mono-latin-wght-normal-B9CIFXIH.woff2 | public/sites/charbeltannous/jetbrains-mono-latin-wght-normal.woff2 |
| OG Image | /og.png | public/sites/charbeltannous/og.png |
| Favicon SVG | /favicon.svg | public/sites/charbeltannous/favicon.svg |

