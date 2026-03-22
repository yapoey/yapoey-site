# Feature: UI Modernization

## Design Direction
Modern developer portfolio — 2025 style.
References: Linear.app, Vercel.com, Leerob.io, brittanychiang.com

## Color System (CSS Variables)
```css
--color-bg: #0a0a0f
--color-bg-2: #13131a
--color-surface: #1a1a25
--color-border: rgba(255,255,255,0.08)
--color-primary: #6366f1    /* indigo */
--color-accent: #22d3ee     /* cyan */
--color-text: #e2e8f0
--color-text-muted: #64748b
--color-success: #22c55e
```

Light mode: inverse with warm whites, same primaries.

## Typography
- Drop Google Fonts Poppins/Roboto
- Use `Inter` (system-friendly) or `Space Grotesk` for headings
- Monospace: `JetBrains Mono` for code/CLI elements

## Component-by-Component Plan

---

### HeroArea (full rewrite)
Current: Basic text + static image + shaped bg
New:
- Full viewport height
- Left: text content with typed animation (keep vue-typed-js)
- Right: 3D or animated element (reuse existing Galaxy/YapoeY 3D or lottie animation)
- Background: subtle gradient mesh or particle canvas
- Stats bar below text: "10+ years exp · 15+ projects · 3 languages"
- Two CTAs: "View Work" (scroll) + "Download Resume" (PDF)
- Scroll indicator arrow at bottom

---

### ServiceArea (minor redesign)
Current: Text cards
New:
- Icon grid, 6 cards max
- Each card: icon (SVG, not font-awesome), title, 1-line description
- Hover: card lifts with glow border
- Remove the "I understand the challenges of working remotely" copy — update it

Services to show: Frontend Dev · Backend Dev · API Integration · Performance · i18n/l10n · DevOps basics

---

### AboutArea (redesign)
Current: Wall of text + personal info table
New:
- Left column: Photo + name + location tag + availability badge ("Open to work" or "Currently employed")
- Right column: Short bio (2-3 sentences, not a paragraph wall)
- Below bio: Language badges (Arabic, English, Korean) with flags
- Stats row: Years coding, Projects shipped, Companies worked at
- Download resume button here too
- Remove zip code (not relevant)

---

### ResumeArea (redesign)
Current: Long flat list of experience entries
New:
- Three tabs: Education | Experience | Skills
- Education: vertical timeline with year markers
- Experience: vertical timeline, each entry expands on click for details
- Skills: tag cloud grouped by category:
  - Frontend: Vue, Nuxt, React (if applicable), HTML/CSS, SASS, Tailwind
  - Backend: PHP, Laravel, Node.js
  - DB: MySQL, PostgreSQL
  - Cloud: AWS (S3, Lambda), Appwrite
  - Tools: Git, Jira, Docker, Notion
  - Languages: Arabic (native), English (fluent), Korean (conversational)

---

### WorksArea (redesign)
Current: Flat grid of project images
New:
- Filter tabs: All | Frontend | FullStack | Practicing/Fun
- Masonry or uniform grid
- Each card:
  - Screenshot or placeholder gradient
  - Project name
  - Tech stack tags
  - Live link + GitHub link (if public)
  - On hover: brief description overlay
- Add NEW projects (remove dead links like old GeeksFamily POS)

---

### ContactArea (see CONTACT.md for full details)
Quick summary:
- Remove phone from source
- Add social links
- Better form UX

---

## Animations (light, not overwhelming)

Use CSS animations + IntersectionObserver (no heavy libraries unless needed):
- Sections: fade in + slide up when entering viewport
- Numbers/stats: count-up animation when visible
- Cards: stagger animation (0.1s delay between each)
- Hero: sequence animation on load

If using GSAP: only import what's needed (gsap core + ScrollTrigger)

---

## What to Keep
- Dark mode toggle (already done — fix it properly)
- vue-typed-js for typing animation
- Three.js scenes (Galaxy, YapoeY 3D) — they're unique and cool
- Overall one-page scroll structure

## What to Remove/Replace
- jQuery (replace with native JS or Vue events)
- Bootstrap (replace with Tailwind)
- Owl Carousel (replace with CSS scroll snap or Swiper.js)
- Slick (same)
- FontAwesome (replace with Heroicons SVG or Lucide)
- Simple Line Icons (same)

## CSS Architecture
```
assets/
  css/
    base.css         # reset, variables, typography
    components/      # per-component styles (if not using Tailwind)
```

With Tailwind: most inline, extract to @apply for repeated patterns.

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640–1024px
- Desktop: > 1024px

Every section must look good on iPhone 13 (390px wide).
