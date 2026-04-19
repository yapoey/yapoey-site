# Backlog

Deferred improvements for the portfolio site. Pick items up opportunistically.

---

## Resume PDF — highest ROI (shared with recruiters)

- [ ] **Outcome-based headline under the name**
  - Swap generic "Software Engineer" for a keyword-rich line, e.g.
    *"Senior Frontend Engineer · Team Lead · Design Systems · 7+ yrs · FDA-approved healthcare"*
  - Reason: recruiters scan for keywords in the first 3 seconds; ATS filters match on these.

- [ ] **Quantify every bullet possible**
  - Add hard numbers to highlights: team size, users impacted, % perf improvement, bundle-size wins, revenue.
  - At least 1-2 hard metrics per role on page 1.

- [ ] **"Selected Projects" block above the full job list**
  - 3 projects max (Sibel Discovery/Tucana, NooN Center, bizNavi) with 1 line each.
  - Front-load impact — recruiters spend ~6 seconds on page 1.

- [ ] **ATS-friendly skills keyword row on page 1**
  - Surface 10-15 keywords near the top (many ATS systems regex-scan).

- [ ] **Short 1-page PDF variant** (`/resume/print?variant=short`)
  - Collapse old roles (Bio & Pure, GeeksFamily) into a 2-line "Earlier Experience" summary.
  - Share the short PDF by default; long one for referrals.

- [ ] **Clickable live-project URLs directly in the resume PDF**
  - PDFs preserve links; huge trust signal.

---

## SEO & discoverability

- [ ] **JSON-LD structured data**
  - `Person` schema on `/`, `WebPage` + `BreadcrumbList` on `/resume`, `CreativeWork` on each project.
  - Helps Google rich results AND AI search engines (ChatGPT Search, Perplexity) cite the site.

- [ ] **Individual project pages at `/works/[slug]`**
  - Currently projects only live in a modal — invisible to Google.
  - Static routes pulling from `useResumeData` → 17+ indexable pages instead of 1.

- [ ] **Real blog with 3-4 technical posts**
  - Post ideas: "Migrating 50k-LOC React app to Vue", "Building a design system as an npm workspace", "Why we chose Tauri + Nuxt for YapoeY Finance".
  - Each post = organic search entry point. Infra already planned in PHASES.md.

- [ ] **Image alt text + descriptive file names**
  - Rename generic image files, e.g. `galaxy.png` → `galaxy-3d-threejs-particle-simulation.png`.
  - Always set descriptive `alt` attributes.

---

## Conversion (once people land)

- [ ] **Recruiter-mode CTA above the fold**
  - Pre-filled `mailto:me@yapoey.com?subject=Role%20opportunity`.

- [ ] **Video/GIF demos inside `ProjectModal`**
  - 5-second MP4 loops of Discovery Hub or Tucana — 100× more persuasive than stills.

- [ ] **Testimonials**
  - One line each from a Sibel manager, a YapoeY Bit client, a teammate.

---

## Content debt

- [ ] Real logos for remaining projects without branded cards:
  - Meya-Meya
  - AMF (Asian Model Festival)
  - Galaxy 3D
  - YapoeY Finance (currently emoji placeholder)
  - YapoeY MD (currently emoji placeholder)

- [ ] Set explicit display order / arrangement for the projects grid.

- [ ] Confirm / provide URLs for projects still marked `url: null`:
  - Central Monitoring
  - Discovery Hub
  - ChaiTalk
  - Meya-Meya
