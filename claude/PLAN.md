# YapoeY Site - Master Modernization Plan

## Vision
Transform the outdated portfolio into a modern, interactive, professional site with:
- A unique CLI/GUI dual-mode entry experience
- Gemini AI integration for interactive Q&A about you
- Modern UI with smooth animations
- Updated resume and life timeline
- Full blog system with S3 image uploads
- Clean, updated translations

---

## Key Decisions — All Resolved ✅

| Decision | Choice |
|----------|--------|
| Framework | Nuxt 3 + Vite |
| CSS | Tailwind CSS (dark mode via `class` strategy) |
| Gemini proxy | Nuxt 3 server route (`server/api/gemini.post.ts`) |
| Contact backend | Appwrite — store messages, read via admin dashboard |
| Languages | English + Korean + Arabic (RTL) |
| Resume versions | Standard (ATS/API) + Fun (detailed) in EN, KO, AR |
| Profile photo | Real photo (provide min 800x800px) |
| Timeline content | Fill via `claude/CONTENT-TASKS.md` |
| Content input | Fill `claude/CONTENT-TASKS.md` at your own pace |

---

## Phases Overview

| Phase | Feature | Priority | Effort | Owner |
|-------|---------|----------|--------|-------|
| 1 | Foundation: Nuxt 3 + Tailwind migration | MUST | High | Claude / Codex |
| 2 | Intro / Entry Page (CLI vs GUI) | MUST | Medium | Claude |
| 3 | CLI Mode + Gemini Integration | MUST | High | Claude + Codex |
| 4 | UI Modernization (all components) | MUST | High | Claude / Codex |
| 5 | Resume — 2 versions, 3 languages | MUST | Medium | Claude + Gemini CLI |
| 6 | Life Timeline & Milestones | SHOULD | Medium | Claude |
| 7 | Blog System (Appwrite + S3 + Lambda) | SHOULD | High | Claude + Codex |
| 8 | Admin Dashboard (messages + blog) | SHOULD | Medium | Claude + Codex |
| 9 | Translation Overhaul (EN/KO/AR + RTL) | SHOULD | Medium | Gemini CLI + Claude |
| 10 | Contact Form (Appwrite backend) | SHOULD | Low | Claude |

---

## Phase 1 — Foundation & Cleanup
**Goal:** Upgrade the project before adding features.

Tasks:
- [ ] Upgrade Nuxt 2 → Nuxt 3 (or stay on Nuxt 2 if stability matters)
- [ ] Replace Bootstrap with Tailwind CSS for modern utility-first styling
- [ ] Remove unused components (PriceArea, HireArea, TestimonialArea)
- [ ] Clean up unused imports in pages/index.vue
- [ ] Add proper dark mode support (already started — complete it)
- [ ] Set up proper environment variables (.env) for API keys
- [ ] Remove jQuery dependency — use native Vue/JS instead
- [ ] Update Google Analytics to GA4 (current uses old UA)

**Outsource to Codex:** Tailwind migration of existing component styles

Details: `features/FOUNDATION.md`

---

## Phase 2 — Intro / Entry Page (CLI vs GUI)
**Goal:** First impression — user picks how they want to experience the site.

Page: `/` (new landing)
Current portfolio moves to `/gui`

Entry page shows:
- Short animated intro: "Hi, I'm YapoeY"
- Two choices:
  - `[ > CLI ]` — Terminal experience
  - `[ GUI ]` — Classic portfolio
- Keyboard shortcuts (press `1` or `2`, or click)
- Mobile: GUI is default, CLI optional

Details: `features/INTRO-PAGE.md`

---

## Phase 3 — CLI Mode + Gemini Integration
**Goal:** A terminal-like experience connected to Gemini AI.

Route: `/cli`

Features:
- Terminal UI with blinking cursor
- Predefined commands: `help`, `about`, `resume`, `projects`, `contact`, `blog`, `ask [question]`
- `ask` command → calls Gemini API with context about you → returns fun/smart answer
- Recommended prompts shown at start (like: "Who is YapoeY?", "What can he build?", "How to hire him?")
- Full keyboard navigation
- History (arrow up/down)
- ASCII art header

Gemini context: a well-crafted system prompt describing you accurately

Details: `features/CLI-MODE.md`

---

## Phase 4 — UI Modernization
**Goal:** Make the GUI portfolio look professional and modern in 2025.

Key changes:
- New HeroArea: full-screen with animated background (keep Three.js Galaxy or use particles)
- Typography: Inter or Space Grotesk font, better hierarchy
- Cards with glassmorphism effect
- Smooth scroll animations (use GSAP or CSS scroll-timeline)
- Skills section: animated progress bars or radar chart
- Projects section: hover reveals details, filter by type
- Section transitions: fade/slide in on scroll
- Consistent color palette: define CSS variables properly
- Mobile-first responsive improvements
- Better dark mode colors

Component-by-component:
- HeroArea: Rewrite — full-screen, typed animation stays, add CTA buttons
- ServiceArea: Icon grid → modern card grid
- AboutArea: Split layout with photo, stats (years exp, projects, etc.)
- ResumeArea: Tab-based (Education / Experience / Skills) with timeline
- WorksArea: Masonry or grid with filter tabs
- ContactArea: Full redesign — see Phase 9

Details: `features/UI-MODERNIZATION.md`

---

## Phase 5 — Resume Update
**Goal:** Accurate, up-to-date, professional resume — both interactive and downloadable.

Content updates needed:
- b2ggames entry: `2021/12 Till-Now` → update with end date and actual role details
- Add any experience after b2ggames
- Add skills section (currently empty array in locale/en.js)
- Add certifications, open source contributions
- Add YouTube channel milestone

Format improvements:
- Interactive HTML resume on `/resume` page
- Clean PDF generated from HTML (no more Word doc)
- Remove .docx download option

**Outsource to Gemini CLI:** Rewrite bullet points in strong, ATS-friendly language

Details: `features/RESUME.md`

---

## Phase 6 — Life Timeline & Milestones
**Goal:** Tell your story visually — countries, milestones, trips.

Route: `/timeline`
Or: a section in the main portfolio between About and Resume

Content:
- Life milestones: Egypt, Korea, travels, career, etc.
- Trip log: countries visited, memorable moments
- Visual: vertical or horizontal scrolling timeline
- Each entry: year, location, icon/flag, short description, optional photo

Tech: CSS timeline component or a library like vis-timeline

Details: `features/TIMELINE.md`

---

## Phase 7 — Blog System
**Goal:** A working blog you can actually update.

Stack:
- Backend: Appwrite (database + auth)
- Images: AWS S3 + Lambda (upload → get URL)
- Frontend: Nuxt pages + Appwrite SDK

Admin workflow:
1. Write post in admin page (`/admin/blog/new`)
2. Upload images → Lambda → S3 → returns URL → paste in post
3. Save post to Appwrite
4. Post appears on `/blog`

Features:
- Rich text editor (TipTap or Quill)
- Image upload button in editor → triggers S3 flow
- Tag system
- Code blocks with syntax highlighting
- Reading time estimate
- CLI: `blog` command lists latest posts, `open [id]` opens in browser

Existing blog pages (`/blog/coding-test`, `/blog/courses`) need to be connected to Appwrite.

Details: `features/BLOG-SYSTEM.md`

---

## Phase 8 — Translation Overhaul
**Goal:** Fix stale, awkward translations. Add Arabic back.

Current state:
- English: outdated content, some untranslated fields
- Korean: needs review
- Arabic: commented out

Plan:
- Rewrite English locale with updated content (Phase 5 + 4 changes)
- **Outsource Korean translation to Gemini CLI**
- **Outsource Arabic translation to Gemini CLI**
- Add new keys for Timeline, CLI, Blog sections
- Fix detectBrowserLanguage config

Gemini CLI workflow:
```
gemini "translate this JSON to Korean, keeping keys exactly the same" < locale/en.js
```

Details: `features/TRANSLATIONS.md`

---

## Phase 9 — Contact Form Upgrade
**Goal:** Modern contact experience, not a plain HTML form.

Issues with current form:
- EmailJS public key exposed in source code → move to env var
- No validation feedback
- No loading state
- Phone number publicly visible in source code

Plan:
- Add loading spinner on submit
- Real-time validation with error messages
- Move EmailJS keys to .env
- Remove phone number from source — use icon link to WhatsApp/Telegram instead
- Add social links row (GitHub, LinkedIn, YouTube, Twitter/X)
- Consider replacing EmailJS with a small Lambda function or Appwrite function

Details: `features/CONTACT.md`

---

## Phase 8 — Admin Dashboard
**Goal:** Single place to manage blog posts and read contact messages.

Route: `/admin` (protected — Appwrite auth)

Pages:
- `/admin` — dashboard home (stats: message count, post count)
- `/admin/messages` — inbox: list contact form submissions, mark read, delete
- `/admin/blog` — list all posts (draft + published), edit, delete
- `/admin/blog/new` — create new post (TipTap editor + S3 image upload)
- `/admin/blog/[id]/edit` — edit existing post

Access: Appwrite account session — only you can log in.

Details: `features/BLOG-SYSTEM.md` (admin sections) + `features/CONTACT.md`

---

## Execution Order (Recommended)

```
Phase 1 → Phase 4 → Phase 2 → Phase 3 → Phase 10 → Phase 7 → Phase 8 → Phase 5 → Phase 6 → Phase 9
```

**You fill `CONTENT-TASKS.md` in parallel** — content is needed for Phases 5, 6, 9.

Explanation:
- Phase 1 first — everything depends on Nuxt 3 + Tailwind being set up
- Phase 4 next — get the UI looking good before adding features
- Phase 2 + 3 — entry page and CLI are the signature features, do early
- Phase 10 — contact form is simple once Appwrite is set up (from Phase 7)
- Phase 7 + 8 — blog and admin together (same Appwrite project)
- Phase 5 + 6 — resume and timeline depend on your content input
- Phase 9 last — translations after all content is final

---

## Outsourcing Map

| Task | Tool | Notes |
|------|------|-------|
| Tailwind migration of CSS | Codex | Give it component + CSS, get Tailwind output |
| Translation (KO, AR) | Gemini CLI | Provide en.js, ask for translation |
| Resume bullet point rewriting | Gemini CLI | ATS-friendly language |
| Blog CRUD boilerplate | Codex | Appwrite SDK integration |
| S3 Lambda function | Codex | Standard upload pattern |
| CLI command parser | Codex | Terminal UI logic |
| Planning & architecture | Claude (you) | This file |

---

## Remaining Open Questions

1. **Appwrite self-hosted or cloud?** — Appwrite Cloud recommended (free tier generous, zero infra)
2. **Domain structure** — Everything on yapoey.com or separate subdomains? (e.g. admin.yapoey.com)

Both can be decided during Phase 1 setup — not blockers.
