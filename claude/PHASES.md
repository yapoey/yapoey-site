# YapoeY Site Modernization — Implementation Phases

## Context
The yapoey-site is a Nuxt 2 portfolio site using Bootstrap, jQuery, and legacy tooling. The goal is to modernize it into a Nuxt 3 + Tailwind site with CLI mode (Gemini AI), blog system (Appwrite), and 3-language support (EN/KO/AR). All architectural decisions are already resolved in `claude/DECISIONS.md`.

---

## Execution Order

```
Phase 1 (Foundation) → Phase 2 (UI) → Phase 3 (Intro + CLI) → Phase 4 (Resume + Timeline) → Phase 5 (Contact + Appwrite) → Phase 6 (Blog + Admin) → Phase 7 (Translations)
```

**Parallel track:** Fill `claude/CONTENT-TASKS.md` during Phases 1-3 (needed by Phase 4).

---

## Phase 1: Foundation — Nuxt 3 Migration ✅
**Goal:** Fresh Nuxt 3 project with core infrastructure ported over.
**Branch:** `nuxt3-migration`

### 1A: Scaffold Nuxt 3 Project ✅
- [x] Init fresh Nuxt 3 project
- [x] Configure `nuxt.config.ts`: SSR mode, dev server port
- [x] Install Tailwind CSS + `@tailwindcss/typography`
- [x] Configure `tailwind.config.ts` with `darkMode: 'class'`
- [x] Set up base SCSS variables (color system from `claude/features/UI-MODERNIZATION.md`)
- [x] Install Inter + JetBrains Mono fonts (replace Poppins/Roboto)
- [x] Create `.env` + `.env.example` (GA ID, Gemini key placeholder, Appwrite keys)
- [x] Set up `useRuntimeConfig()` for env vars

### 1B: Port Core Infrastructure ✅
- [x] Migrate Vuex store → Pinia (dark mode state + cookie persistence)
- [x] Migrate `middleware/init.js` → Nuxt 3 middleware format
- [x] Set up `@nuxtjs/i18n` v8 (EN, KO, AR locales — AR starts empty)
- [x] Port `locale/en.js` and `locale/ko.js` to Nuxt 3 i18n format (now `.ts`)
- [x] Set up `nuxt-gtag` with GA4 placeholder (replace old UA)
- [x] Create base layouts: `default.vue`, `blog.vue`, `error.vue`

### 1C: Port Pages & Components ✅
- [x] Port `pages/index.vue` → basic page (renders components)
- [x] Port active components with Tailwind:
  - [x] Header (sticky, glassmorphism, mobile menu, lang switcher, dark toggle)
  - [x] Footer (SVG social icons, copyright)
  - [x] HeroArea (custom typewriter, responsive)
  - [x] AboutArea (2-col layout, info list, CV download)
  - [x] ServiceArea (4-card grid, glassmorphism)
  - [x] ResumeArea (3 tabs, expandable jobs, skill icons)
  - [x] WorksArea (Vue filter tabs, hover effects)
  - [x] ContactArea (clean form, success modal placeholder)
- [x] Absorbed Common/ functionality into main components
- [x] Delete unused: PriceArea, HireArea, TestimonialArea, BlogArea
- [x] Port blog pages structure (`pages/blog/`) to Nuxt 3 `[param]` format
- [x] Static assets remain in `static/` → `public/` (kept existing path)
- [x] Remove jQuery — replaced with Vue equivalents:
  - [x] slicknav → CSS + Vue mobile hamburger menu
  - [x] scrollUp → native `scrollTo` button
  - [x] isotope → Vue reactive filter
  - [x] owl.carousel/slick → removed (not needed currently)
  - [x] typed.js → custom Vue typewriter composable

### 1D: Verify & Clean Up ✅
- [x] Dev server runs without errors
- [x] All pages render and navigate correctly
- [x] Dark mode toggle works (Pinia + cookie)
- [x] Language switching works (EN/KO/AR stub)
- [x] No jQuery references remain
- [x] Bootstrap CSS/JS no longer loaded (Tailwind replaces all)
- [x] Old Vuex store removed
- [x] Old locale .js files removed
- [x] Old SCSS files removed

**Effort:** High (largest phase) — COMPLETED

---

## Phase 2: UI Modernization — Component Redesign ✅
**Goal:** Make the GUI portfolio look modern (2025 standard).
**Design references:** Linear.app, Vercel.com, brittanychiang.com

### 2A: Design System Setup ✅
- [x] Define color palette as Tailwind theme + SCSS CSS variables
- [x] Set up dark/light mode color tokens (--color-primary-glow, improved muted)
- [x] Create reusable UI primitives: btn-primary, btn-outline, glass, glass-hover, section-label
- [x] Set up scroll animations (useReveal composable + IntersectionObserver + CSS .reveal class)

### 2B: Component Rewrites ✅
- [x] **Header**: Sticky glassmorphism (already done in Phase 1, kept)
- [x] **HeroArea**: Full viewport, gradient bg, glow blobs, stats bar, 2 CTAs, scroll indicator
- [x] **ServiceArea**: 4-card grid with glass-hover, centered layout
- [x] **AboutArea**: Photo with glow, language badges (flags), info grid cards
- [x] **ResumeArea**: 3 pill tabs, vertical timeline with dots, expandable jobs, skill cards with hover
- [x] **WorksArea**: Pill filter tabs, aspect-ratio cards, hover overlay with arrow, type badges
- [x] **ContactArea**: Glass info cards, modern form inputs, Teleport success modal
- [x] **Footer**: Compact row layout, social icon buttons with hover

### 2C: Responsive & Polish ✅
- [x] Mobile-first via Tailwind responsive classes on all components
- [x] Tablet breakpoints (sm/lg grids)
- [x] Dark mode tokens improved (primary-glow, better muted contrast)
- [x] Section reveal animations (fade + slide up on scroll via useReveal)
- [x] Staggered reveal delays (reveal-delay-1 through 4)

**Effort:** High — COMPLETED

---

## Phase 3: Intro Page + CLI Mode ✅
**Goal:** The signature feature — entry page with CLI/GUI choice + Gemini AI terminal.

### 3A: Entry Page (`/`) ✅
- [x] New `pages/index.vue` — full screen dark intro with gradient blobs
- [x] Typewriter: "Hi, I'm YapoeY" with animated reveal
- [x] Subtitle: "Full Stack Developer · Seoul, Korea" (fade in)
- [x] Two buttons: CLI (terminal/green) / GUI (glassmorphism/gradient)
- [x] Keyboard shortcuts (1 = CLI, 2 = GUI)
- [x] Returning visitor localStorage → auto-redirect to preferred mode
- [x] Current portfolio moved to `pages/gui.vue`

### 3B: CLI Terminal UI (`/cli`) ✅
- [x] `pages/cli.vue` — full terminal page with top bar
- [x] `composables/useTerminal.js` — all terminal logic
- [x] ASCII art header on init
- [x] Blinking cursor, keyboard input
- [x] Command history (arrow up/down)
- [x] Tab autocomplete from known commands
- [x] Built-in commands: help, about, resume, projects, skills, contact, blog, clear, gui, exit, lang
- [x] Color-coded output (green=cmd, gray=info, red=error, yellow=AI, purple=ASCII)

### 3C: Gemini AI Integration ✅
- [x] `server/api/gemini.post.js` — proxy to Gemini 2.0 Flash API
- [x] System prompt with full YapoeY context
- [x] `ask [question]` command → Gemini
- [x] Unrecognized commands → fall through to Gemini
- [x] Loading indicator while waiting
- [x] Graceful error when API key not set
- [x] Suggested prompts shown in welcome message

### 3D: Mobile CLI ✅
- [x] Input focuses on tap anywhere in terminal
- [x] Scrollable terminal output (auto-scroll on new output)
- [x] Tap-to-run command chips (mobile only, hidden on desktop)

**Effort:** High — COMPLETED

---

## Phase 4: Resume + Timeline ⬜
**Goal:** Updated resume content + life story timeline.
**Depends on:** User filling `CONTENT-TASKS.md` (Tasks 1, 2, 3, 6, 7, 8)

### 4A: Resume Page (`/resume`) ⬜
- [ ] Interactive HTML resume page
- [ ] Two versions: Standard (ATS) + Fun (detailed)
- [ ] Tab or toggle to switch between versions
- [ ] PDF export from browser (or pre-generated)
- [ ] Content from `CONTENT-TASKS.md`

### 4B: Timeline Page (`/timeline`) ⬜
- [ ] Vertical scrolling timeline component
- [ ] Entries: year, location, flag, description, optional photo
- [ ] Event types: career, travel, education, personal, achievement
- [ ] Content from `CONTENT-TASKS.md`
- [ ] Smooth scroll animations

**Effort:** Medium

---

## Phase 5: Contact + Appwrite Backend ⬜
**Goal:** Replace EmailJS with Appwrite, set up backend for blog too.

### 5A: Appwrite Setup ⬜
- [ ] Set up Appwrite Cloud project
- [ ] Create database + collections:
  - `contact_messages` (name, email, subject, message, createdAt, read)
  - `blog_posts` (title, slug, content, tags, status, createdAt, updatedAt)
- [ ] Set up Appwrite auth (admin-only)
- [ ] Configure Appwrite SDK in Nuxt 3

### 5B: Contact Form Upgrade ⬜
- [ ] Real-time validation with error messages
- [ ] Loading spinner on submit
- [ ] Submit → Appwrite `contact_messages` collection
- [ ] Remove EmailJS dependency entirely
- [ ] Remove phone number from source
- [ ] Add social links row (GitHub, LinkedIn, YouTube, etc.)

**Effort:** Low-Medium

---

## Phase 6: Blog System + Admin Dashboard ⬜
**Goal:** Working blog with admin panel.

### 6A: Blog Frontend ⬜
- [ ] Blog listing page (`/blog`) — cards with title, date, tags, reading time
- [ ] Blog post page (`/blog/[slug]`) — rendered from Appwrite
- [ ] Tag filtering
- [ ] Code blocks with syntax highlighting (Shiki or Prism)
- [ ] Connect existing blog routes (coding-test, courses) to Appwrite

### 6B: Image Upload Pipeline ⬜
- [ ] AWS S3 bucket for blog images
- [ ] Lambda function: upload endpoint → returns S3 URL
- [ ] Or: Appwrite Storage (simpler alternative)

### 6C: Admin Dashboard ⬜
- [ ] `/admin` — protected route (Appwrite auth)
- [ ] `/admin/messages` — inbox, mark read, delete
- [ ] `/admin/blog` — list posts (draft/published), edit, delete
- [ ] `/admin/blog/new` — TipTap rich text editor + image upload
- [ ] `/admin/blog/[id]/edit` — edit existing post

**Effort:** High

---

## Phase 7: Translations (EN/KO/AR + RTL) ⬜
**Goal:** All content in 3 languages, Arabic with full RTL support.
**Do last** — all content must be finalized first.

### 7A: English Content Finalization ⬜
- [ ] Update all locale keys with new content from phases 2-6
- [ ] Add new keys for: CLI, Timeline, Blog, Admin sections

### 7B: Korean Translation ⬜
- [ ] Translate updated en.js → ko.js (Gemini CLI assisted)
- [ ] Review and polish

### 7C: Arabic Translation + RTL ⬜
- [ ] Create ar.js from en.js (Gemini CLI assisted)
- [ ] Add `dir="rtl"` on `<html>` when locale = `ar`
- [ ] RTL-specific Tailwind utilities
- [ ] Test every section in RTL mode
- [ ] Fix any layout issues

**Effort:** Medium

---

## Verification Plan

| Phase | How to verify |
|-------|---------------|
| 1 | Dev server runs, all pages render, dark mode + i18n work, no jQuery |
| 2 | Visual comparison with design references, responsive on mobile |
| 3 | CLI commands work, Gemini responds, entry page redirects correctly |
| 4 | Resume renders with real content, timeline scrolls smoothly |
| 5 | Contact form submits to Appwrite, messages appear in collection |
| 6 | Blog CRUD works, images upload, admin dashboard functional |
| 7 | All 3 languages render correctly, Arabic RTL layout is clean |
