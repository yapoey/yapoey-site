# Feature: Resume Update

## Current Problems
1. Last experience entry says `2021/12 Till-Now` — outdated
2. Skills section is empty (`skills: []` in locale/en.js)
3. Resume PDF is a Word doc converted to PDF — looks bad, large file size
4. `.docx` file is publicly downloadable — unprofessional
5. Resume copy is verbose and not ATS-optimized
6. No certifications, no YouTube channel mention
7. PDF stored in `/static/assets/resume/` — not versioned well

---

## Content Updates Needed

### Experience — What to Update
- Update b2ggames entry with correct end date
- Add any jobs/freelance after b2ggames
- Add recent tech stack additions (Nuxt 3, TypeScript, AWS, Docker, etc.)
- Rewrite bullet points in strong action verb format

**Current bullet example (weak):**
> "Daily maintenance of existed project playerz, debugging issues and solving clients problems."

**Target format (strong, ATS-friendly):**
> "Maintained and debugged production application (playerz) serving X+ users, reducing client-reported issues by X%"

**Outsource this rewriting to Gemini CLI.**

### Skills — Fill in the Empty Array
Grouped skills to add:

```
Frontend:     Vue.js, Nuxt.js, HTML5, CSS3, SASS, Tailwind CSS, Bootstrap, jQuery, TypeScript
Backend:      PHP, Laravel, Node.js, REST API design
Database:     MySQL, PostgreSQL
Cloud/Infra:  AWS S3, AWS Lambda, Docker (basic)
Tools:        Git, GitHub, Bitbucket, Jira, Notion, Figma (basic)
Languages:    Arabic (native), English (fluent), Korean (intermediate)
```

### Education — Keep as-is but clean up
- Fix typo: "Kyng hee University" → "Kyung Hee University"
- Add graduation year to Hanyang (2019)

### New Section: Highlights / Stats
Show at the top of resume:
- X years of professional experience
- X companies worked at
- X languages spoken
- YouTube creator (Arabic dev content)

---

## Two Resume Versions ✅

### Version 1: Standard (ATS-friendly, API-readable)
- Clean single-column layout
- No decorative elements that confuse parsers
- Plain bullet points, clear section headers
- Machine-readable when PDF text is extracted
- Languages: EN, KO, AR

### Version 2: Fun / Detailed
- Two-column layout with personality
- Full story for each role (not just bullets)
- Real photo, links to projects built at each company
- "Fun facts" section, YouTube highlights
- Language: EN primary, KO optional

### Current files (outdated, to be replaced):
```
static/assets/resume/
  YapoeY.en.pdf       ← replace with standard EN
  YapoeY.en.old.pdf   ← delete
  YapoeY.en.docx      ← delete
  YapoeY.ko.pdf       ← replace with standard KO
  YapoeY.ko.old.pdf   ← delete
  YapoeY.ko.docx      ← delete
```

### Target file structure (Nuxt 3 uses public/ not static/):
```
public/assets/resume/
  yapoey.en.standard.pdf     ← ATS clean, used by API
  yapoey.en.full.pdf         ← Fun / detailed version
  yapoey.ko.standard.pdf     ← Korean clean
  yapoey.ar.standard.pdf     ← Arabic clean (new)
```

### API Access
Site will expose a simple endpoint that returns the resume URL based on lang + version:
```
GET /api/resume?lang=en&version=standard
→ { url: "https://yapoey.com/assets/resume/yapoey.en.standard.pdf" }
```
CLI mode: `resume` command calls this, offers to open in browser.

---

## Format: Interactive HTML Resume

### Route: `/resume`

Layout:
```
┌─────────────────────────────────────────────┐
│  Mohamed Ibrahim (YapoeY)                   │
│  Full Stack Developer · Seoul, South Korea  │
│  [Download PDF] [GitHub] [LinkedIn]         │
├─────────────────────────────────────────────┤
│  [Education]  [Experience]  [Skills]        │
├─────────────────────────────────────────────┤
│  Timeline content here...                   │
└─────────────────────────────────────────────┘
```

Features:
- Print-friendly CSS (`@media print`)
- PDF generated from HTML using browser print or a library like `html2pdf.js`
- This replaces the Word/PDF file in `/static/`
- Clean, single-page design
- Scroll through all experience in timeline format

### PDF Generation Options
1. **Browser print** — user presses print, selects "Save as PDF" — free, simple
2. **html2pdf.js** — client-side PDF generation button — still free
3. **Puppeteer Lambda** — server-side perfect PDF — overkill for now

**Recommendation:** html2pdf.js for now, upgrade later.

---

## File Changes
- Update `locale/en.js` → all experience, skills, education
- Update `locale/ko.js` → translate with Gemini CLI
- Update `locale/ar.js` → translate with Gemini CLI
- Update `components/ResumeArea.vue` → new tab UI
- Create `pages/resume.vue` → dedicated resume page
- Remove `/static/assets/resume/YapoeY.en.docx`
- Replace `/static/assets/resume/YapoeY.en.pdf` with html2pdf generated output

---

## Outsourcing to Gemini CLI

Task 1: Rewrite experience bullet points
```bash
gemini "Rewrite these resume bullet points in strong, ATS-friendly format with action verbs. Keep technical stack mentions. Return JSON with same structure." < resume_experiences.json
```

Task 2: Generate skills section
```bash
gemini "Based on this experience, generate a grouped skills section for a resume." < resume_experiences.json
```

Task 3: Translate to Korean
```bash
gemini "Translate this resume JSON to Korean. Keep all proper nouns (company names, tech stack names) in English. Return same JSON structure." < locale/en.js
```
