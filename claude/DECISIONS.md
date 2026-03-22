# Open Decisions

Things that need your input before implementation can start.

---

## 1. Framework: Nuxt 2 or Nuxt 3?

**✅ DECIDED: Nuxt 3**

- Modern, faster (Vite instead of Webpack)
- Better DX: auto-imports, TypeScript, composables
- Required for Nuxt server routes (clean Gemini proxy)
- Migration handled in Phase 1

---

## 2. CSS: Bootstrap or Tailwind?

**✅ DECIDED: Tailwind CSS**

- Better for modern custom designs
- Easier dark mode with `dark:` variants
- Smaller bundle (purged at build time)
- Codex handles Bootstrap → Tailwind class migration per component

---

## 3. Gemini API — How to access?

**✅ DECIDED: Nuxt 3 server route** (follows from Decision 1)

- `server/api/gemini.post.ts` — runs server-side, key never exposed
- No extra infra needed
- Clean and consistent with the rest of the Nuxt 3 app

---

---

## 4. Contact Form Backend

**✅ DECIDED: Appwrite — full backend**

- Drop EmailJS completely
- Create Appwrite collection `contact_messages` to store submissions
- Build a small admin dashboard page (`/admin/messages`) to read messages
- No email sending needed — just check dashboard
- Bonus: can reply from dashboard or forward manually

Appwrite collection: `contact_messages`
Fields: name, email, subject, message, createdAt, read (bool)

---

## 5. Arabic Language — Reactivate?

**✅ DECIDED: Yes — Arabic reactivated with full RTL support**

- Gemini CLI handles translation from en.js
- RTL support: `dir="rtl"` on `<html>` when locale = `ar`
- Test every section in RTL before publishing
- Resume: add `YapoeY.ar.pdf` to static/assets/resume/
- See `features/TRANSLATIONS.md` for full RTL plan

---

## 6. Your Updated Experience

**✅ DECIDED: Fill using task form (see CONTENT-TASKS.md)**

- Task file created at `claude/CONTENT-TASKS.md`
- Fill in the forms there at your own pace
- Two resume versions planned:
  - **Standard** — ATS-friendly, clean PDF, API-readable format
  - **Fun** — detailed, creative, full story version
- Current resume files: `static/assets/resume/YapoeY.en.pdf`, `YapoeY.ko.pdf`, `.docx` variants
- All will be replaced with updated versions after content is filled

---

## 7. Social Links

**✅ DECIDED: Fill using task form (see CONTENT-TASKS.md)**

Fill in the table in `claude/CONTENT-TASKS.md` when ready.
These links are needed before Phase 9 (Contact) can be completed.

---

## 8. Profile Photo

**✅ DECIDED: Real photo**

- Replace illustration with your real photo
- Provide a high-res photo when ready (min 800x800px)
- Will be used in HeroArea and AboutArea
- Place at: `public/assets/img/profile.jpg` (Nuxt 3 uses `public/` instead of `static/`)
- Plan will add a circular crop with subtle border/glow in the UI

---

## 9. Timeline Content

**✅ DECIDED: Fill from resume + your provided milestones (see CONTENT-TASKS.md)**

- Will be built from the resume content you provide
- Fill the timeline form in `claude/CONTENT-TASKS.md`
- Countries visited + milestones sections in that file

---

## Summary — Decisions Needed Before Starting

| # | Decision | Status | Blocks |
|---|----------|--------|--------|
| 1 | Nuxt 2 vs 3 | ✅ Nuxt 3 | Phase 1 |
| 2 | Bootstrap vs Tailwind | ✅ Tailwind | Phase 1 |
| 3 | Gemini proxy method | ✅ Nuxt server route | Phase 3 |
| 4 | Contact form backend | ✅ Appwrite dashboard | Phase 9 |
| 5 | Arabic language | ✅ Yes + RTL | Phase 8 |
| 6 | Updated resume content | ✅ Fill CONTENT-TASKS.md | Phase 5 |
| 7 | Social links | ✅ Fill CONTENT-TASKS.md | Phase 9 |
| 8 | Profile photo | ✅ Real photo | Phase 4 |
| 9 | Timeline content | ✅ From resume + CONTENT-TASKS.md | Phase 6 |

All 9 decisions resolved. Ready to start Phase 1.
