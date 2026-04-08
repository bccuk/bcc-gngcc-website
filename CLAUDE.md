# GNG Cricket Club Website — Project Steering File

> Maintained by Claude Code. Updated as the project evolves.
> Last updated: 2026-04-08

---

You are a senior frontend engineer building a production-ready static website for a UK-based cricket club.

## 🎯 PROJECT GOAL
Build a clean, modern, minimalistic, mobile-first website for "GNG Cricket Club" using static technologies. This is a temporary but production-quality website that will be used for ~6 months before migrating to a full SaaS platform (ClubOS).

The website must:
- Look professional (agency-level quality)
- Be fast and SEO-friendly
- Be secure (no backend, no secrets)
- Capture membership enquiries via a form
- Be easy to deploy on GitHub Pages

---

## 🧱 TECH STACK (STRICT)
- HTML5 (semantic)
- Tailwind CSS via CDN (using the config from Stitch files)
- Vanilla JavaScript (only where necessary — mobile nav toggle, form feedback)
- NO React, NO frameworks, NO backend

---

## 📁 PROJECT STRUCTURE

```
/ (root)
  index.html
  about.html
  team.html
  membership.html
  contact.html
  sponsorship.html
  /assets
    /css
      style.css       ← shared custom CSS (btn classes, material-symbols, utilities)
    /js
      main.js         ← mobile nav, smooth scroll, form success handling
    /images
  /components         ← not used (inline header/footer per page instead)
```

---

## 🎨 DESIGN SYSTEM (FROM GOOGLE STITCH)

Source: `/Users/bccadmin/Downloads/stitch_gng/`
Design philosophy doc: `pavilion_heritage/DESIGN.md`

### Color Tokens (Tailwind extended colors)
```js
"primary":                  "#410003"   // Deep Burgundy — primary brand
"primary-container":        "#630e0e"   // Darker burgundy — hover states
"on-primary":               "#ffffff"
"secondary":                "#735c00"   // Champagne Gold — accents, CTAs
"secondary-fixed":          "#ffe088"   // Light gold — text on dark BG
"secondary-container":      "#fed65b"
"on-secondary":             "#ffffff"
"on-secondary-container":   "#745c00"
"background":               "#fcf8f8"   // Warm off-white canvas
"surface":                  "#fcf8f8"
"surface-bright":           "#fcf8f8"
"surface-container-lowest": "#ffffff"
"surface-container-low":    "#f6f3f2"
"surface-container":        "#f1edec"
"surface-container-high":   "#ebe7e7"
"surface-container-highest":"#e5e2e1"
"surface-dim":              "#ddd9d9"
"surface-variant":          "#e5e2e1"
"on-surface":               "#1c1b1b"
"on-surface-variant":       "#564240"
"on-background":            "#1c1b1b"
"outline":                  "#8a716f"
"outline-variant":          "#ddc0bd"
"tertiary":                 "#002107"   // Deep green — minimal use
"tertiary-fixed":           "#72fe88"
"tertiary-fixed-dim":       "#53e16f"
"tertiary-container":       "#003911"
"on-tertiary":              "#ffffff"
"on-tertiary-container":    "#02b045"
"inverse-surface":          "#313030"
"inverse-on-surface":       "#f4f0ef"
"inverse-primary":          "#ffb4ac"
"surface-tint":             "#a23d36"
"error":                    "#ba1a1a"
"error-container":          "#ffdad6"
"on-error":                 "#ffffff"
"on-error-container":       "#93000a"
"primary-fixed":            "#ffdad6"
"primary-fixed-dim":        "#ffb4ac"
"on-primary-fixed":         "#410003"
"on-primary-fixed-variant": "#822622"
"on-primary-container":     "#ec756b"
"secondary-fixed-dim":      "#e9c349"
"on-secondary-fixed":       "#241a00"
"on-secondary-fixed-variant":"#574500"
```

### Typography
- **Headlines (font-headline):** Lexend — weights 400/700/800/900
- **Body & Labels (font-body / font-label):** Plus Jakarta Sans — weights 400/500/600/700
- Google Fonts URL: `https://fonts.googleapis.com/css2?family=Lexend:wght@400;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap`

### Typography Scale
| Token | Font | Size | Weight | Use |
|-------|------|------|--------|-----|
| display-lg | Lexend | 3.5rem–9rem | 900 | Hero headlines |
| headline-md | Lexend | 2.5–4rem | 800 | Section headers |
| title-lg | Plus Jakarta Sans | 1.375rem | 600 | Card headers |
| body-lg | Plus Jakarta Sans | 1rem | 400 | Body copy |
| label-md | Plus Jakarta Sans | 0.75rem | 700 | UPPERCASE metadata |

### Border Radius (standard across pages)
```js
"DEFAULT": "0.25rem"
"lg":      "0.5rem"
"xl":      "0.75rem"
"full":    "9999px"
```

### Icons
Material Symbols Outlined (Google): `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap`
Usage: `<span class="material-symbols-outlined">icon_name</span>`
Custom CSS: `.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }`

### Design Principles (from DESIGN.md)
- **Intentional Asymmetry + Aggressive Whitespace** — 80px min vertical between sections
- **No 1px dividers** — use tonal background shifts instead (`surface` → `surface-container-low` → `white`)
- **Hero Gradients** — `bg-gradient-to-r from-primary via-primary/60 to-transparent` over photo
- **Glassmorphism nav** — `bg-white/90 backdrop-blur-md`
- **Tinted shadows** — `box-shadow: 0 20px 40px -15px rgba(65, 0, 3, 0.15)`
- **No pure black text** — use `on-background` (#1c1b1b)
- **Left-align body text** — center only short display headers
- **Grayscale images** — `grayscale hover:grayscale-0 transition-all duration-700` on cards
- **Group hover effects** — cards go `bg-primary text-white` on hover

### Button Classes (reuse across pages)
```css
.btn-primary  → bg-primary text-white px-8 py-3 font-headline font-bold uppercase tracking-widest hover:bg-primary-container
.btn-gold     → bg-secondary text-white px-8 py-3 font-headline font-bold uppercase tracking-widest hover:bg-secondary/90
.btn-outline  → border border-primary/20 text-primary px-8 py-3 font-headline font-bold uppercase tracking-widest hover:bg-primary hover:text-white
```

---

## 📄 PAGES (6 TOTAL — BASED ON STITCH FILES)

| File | Source Stitch | Status |
|------|--------------|--------|
| `index.html` | `refined_home_page/code.html` | To build |
| `about.html` | `refined_about_page/code.html` | To build |
| `team.html` | `refined_team_page/code.html` | To build |
| `membership.html` | `refined_join_us_page/code.html` | To build |
| `contact.html` | `refined_contact_page/code.html` | To build |
| `sponsorship.html` | `refined_sponsorship_page/code.html` | To build |

---

## 🧭 NAV STRUCTURE
```
Logo/Name  |  About  Team  Contact  Sponsorship  |  [Join Us CTA]
```
Active page link: `text-secondary border-b-2 border-secondary pb-1`
CTA button: `bg-primary text-white px-6 py-2.5 font-headline font-bold uppercase tracking-widest hover:bg-primary-container`

---

## 🏏 REAL CLUB CONTENT

| Field | Value |
|-------|-------|
| Club Name | GNG Cricket Club |
| Motto | "Playing Without Fear, Without Hate" |
| Location | Gravesend, Kent, UK |
| Secretary | Amaritpal Saini |
| Email | amaritsaini@gmail.com |
| Phone | 07429509861 |
| Facebook | https://www.facebook.com/share/1YXYi3n525/ |
| Instagram | https://www.instagram.com/gngcc.grfc?igsh=MXN3cmtyYmhqanA0ag== |
| 1st XI | Kent League Division 4 — Saturdays |
| 2nd XI | Regional Division — Saturdays |
| Sunday XI | National Cricket League Elite Premier Division — Sundays |
| Winter Nets | Every Sunday, Jan–April, 10:00–12:00 |
| Nets Venue | Gravesend Grammar, Church Walk, Gravesend DA12 2PR |
| Social Member | £50/year — no match fees |
| Playing Member | £200/year + £10 match fees |
| Sponsorship | Bespoke (Silver / Gold / Platinum tiers) |

---

## 📩 FORM INTEGRATION

Use **Formspree** for all forms.
- Action: `https://formspree.io/f/REPLACE_ID` (placeholder — user to update)
- Method: POST
- HTML5 validation on required fields
- Show inline success message on submission (vanilla JS)
- DO NOT include any API keys or secrets

---

## 🔍 SEO (every page)
- Unique `<title>` — format: `{Page} | GNG Cricket Club`
- `<meta name="description">` — unique per page
- Proper h1→h2→h3 hierarchy
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Analytics placeholder in `<head>`: `<!-- Analytics (Cloudflare/GA) -->`

---

## 🦶 FOOTER
- © 2026 GNG Cricket Club. All Rights Reserved.
- Website by Bytecode Consulting (subtle, small text)
- Links: About / Team / Membership / Sponsorship / Contact
- Social: Facebook + Instagram (real URLs above)

---

## ⚡ PERFORMANCE
- Tailwind via CDN (acceptable for static/temp site)
- No heavy JS libraries
- Images: use descriptive `alt` text; placeholders initially (swap with real photos later)
- Minimal custom CSS in `/assets/css/style.css`

---

## 🔐 SECURITY
- No secrets, credentials, or tokens anywhere in the codebase
- All external links use `rel="noopener noreferrer"`
- Forms use Formspree (no backend)

---

## 🚀 DEPLOYMENT
- GitHub Pages (static)
- No build step required — pure HTML/CSS/JS
- All asset paths must be relative (no leading `/`)

---

## 🔄 CHANGE LOG

| Date | Change |
|------|--------|
| 2026-04-08 | Initial steering file created |
| 2026-04-08 | Design system extracted from Google Stitch files at `/Users/bccadmin/Downloads/stitch_gng/` |
| 2026-04-08 | Pages expanded from 3 to 6 based on Stitch output |
| 2026-04-08 | Real club content (contact, social links, pricing, teams) captured from Stitch HTML |
| 2026-04-08 | Google Analytics (G-4L1MZ7V119) integrated across all 6 pages with page_path tracking |
