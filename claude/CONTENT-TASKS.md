# Content Tasks — Fill These In

This file is for you to fill in. Once filled, Claude will use this to:
- Update locale/en.js (experience, skills, bio)
- Build the timeline page
- Update resume files
- Fill contact social links

Fill each section at your own pace. Mark done with [x].

---

## TASK 1 — Work Experience (after b2ggames) [ ]

Current resume ends: `b2ggames, 2021/12 - Till Now`

Fill in:

### b2ggames — Update
- End date (or still there?): ___________
- Updated role/title: ___________
- Key achievements (1-3 bullet points):
  - ___________
  - ___________
  - ___________

### New Job/Role (if any after b2ggames)
- Company: ___________
- Role/Title: ___________
- Employment type (Full-time / Freelance / Contract): ___________
- Country: ___________
- Duration (start - end or present): ___________
- Tech stack used: ___________
- Key responsibilities (bullet points):
  - ___________
  - ___________
  - ___________
  - ___________

*(Copy this block if more than one job)*

---

## TASK 2 — Skills Update [ ]

Check all that apply and add any missing:

### Frontend
- [ ] Vue.js
- [ ] Nuxt.js
- [ ] React.js
- [ ] TypeScript
- [ ] JavaScript (ES6+)
- [ ] HTML5 / CSS3
- [ ] SASS / SCSS
- [ ] Tailwind CSS
- [ ] Bootstrap
- [ ] Other: ___________

### Backend
- [ ] PHP
- [ ] Laravel
- [ ] Node.js
- [ ] Express.js
- [ ] Other: ___________

### Database
- [ ] MySQL
- [ ] PostgreSQL
- [ ] MongoDB
- [ ] Appwrite
- [ ] Other: ___________

### Cloud / DevOps
- [ ] AWS S3
- [ ] AWS Lambda
- [ ] Docker
- [ ] CI/CD (which tools?): ___________
- [ ] Other: ___________

### Tools
- [ ] Git / GitHub
- [ ] Bitbucket
- [ ] Jira
- [ ] Notion
- [ ] Figma
- [ ] Other: ___________

### Human Languages
- [ ] Arabic (native)
- [ ] English (fluent)
- [ ] Korean (level: _____)
- [ ] Other: ___________

---

## TASK 3 — Bio / About Me [ ]

Current bio is long and written in 2021. Write a new 2-3 sentence version:

```
[Write your new short bio here]
```

Stats to show (fill in):
- Years of professional experience: ___
- Number of companies worked at: ___
- Number of countries lived/worked in: ___
- YouTube subscribers (approx): ___

---

## TASK 4 — Social Links [ ]

| Platform | URL | Public? |
|----------|-----|---------|
| GitHub | github.com/__________ | Yes / No |
| LinkedIn | linkedin.com/in/__________ | Yes / No |
| YouTube | youtube.com/@__________ | Yes / No |
| Twitter/X | __________ | Yes / No |
| WhatsApp (link) | wa.me/__________ | Yes / No |
| Other | __________ | Yes / No |

---

## TASK 5 — Profile Photo [ ]

- [ ] Photo ready to use
- File location: ___________
- Note: Needs to be min 800x800px, ideally square crop

---

## TASK 6 — Timeline / Life Milestones [ ]

Add as many as you want. Format: year, event type, title, location, short description.

Event types: career | travel | education | personal | achievement

```
Year: 1992
Type: personal
Title: Born in Egypt
Location: Egypt 🇪🇬
Description:

---
Year: 2011
Type: personal
Title: The Korean connection
Location: Egypt 🇪🇬
Description: Met first Korean friend during the Arab Spring

---
Year: 2013
Type: education
Title: Graduated Ain Shams University
Location: Egypt 🇪🇬
Description: Bachelor in Accounting

---
Year: 2014
Type: travel / education
Title: Moved to South Korea
Location: Seoul, Korea 🇰🇷
Description: Started Korean language school at Kyung Hee University

---
Year: 2015
Type: education
Title: Started Computer Science degree
Location: Seoul, Korea 🇰🇷
Description: Hanyang University

---
Year: 2019
Type: career
Title: First full-time developer role
Location: Seoul, Korea 🇰🇷
Description: Joined GeeksFamily

---
[ADD MORE BELOW]

Year:
Type:
Title:
Location:
Description:
```

---

## TASK 7 — Countries Visited [ ]

List countries you've been to (doesn't need to be exhaustive — just ones worth showing):

```
🇪🇬 Egypt — Home country
🇰🇷 South Korea — Home since 2014
🇶🇦 Qatar — Work (client project)
___ ___________ —
___ ___________ —
___ ___________ —
```

---

## TASK 8 — Resume Versions Plan [ ]

Current files in `static/assets/resume/`:
- YapoeY.en.pdf  (English — outdated)
- YapoeY.en.old.pdf
- YapoeY.en.docx
- YapoeY.ko.pdf  (Korean — outdated)
- YapoeY.ko.old.pdf
- YapoeY.ko.docx

### Standard Resume (API-readable, ATS-friendly)
Clean single-column PDF. Minimal design. Parseable by ATS systems.
Versions needed: EN, KO, AR

- [ ] Fill Tasks 1-2 above
- [ ] Claude will update locale/en.js from your answers
- [ ] Gemini CLI translates to KO and AR
- [ ] Claude builds HTML resume page at /resume
- [ ] Export to PDF from browser

### Fun Resume (detailed, creative, full story version)
Two-column layout. More personality, full descriptions, links, photo.
Versions needed: EN (primary), KO optional

- [ ] Write extended descriptions for each role (go beyond bullet points)
- [ ] Add "Fun facts" section
- [ ] Add links to projects you built at each company
- [ ] Add YouTube / blog highlights

### File naming plan (after update):
```
public/assets/resume/
  yapoey.en.standard.pdf     ← ATS clean
  yapoey.en.full.pdf         ← Fun / detailed
  yapoey.ko.standard.pdf     ← Korean clean
  yapoey.ar.standard.pdf     ← Arabic clean (new)
```

---

## TASK 9 — YouTube Channel Details [ ]

- Channel URL: ___________
- Channel name: ___________
- What do you cover? (1 sentence): ___________
- Approximate subscriber count: ___________
- Started: ___________

---

## Progress Tracker

| Task | Status | Notes |
|------|--------|-------|
| 1 — Work experience | ⏳ | |
| 2 — Skills | ⏳ | |
| 3 — Bio & stats | ⏳ | |
| 4 — Social links | ⏳ | |
| 5 — Profile photo | ⏳ | |
| 6 — Timeline milestones | ⏳ | |
| 7 — Countries visited | ⏳ | |
| 8 — Resume versions | ⏳ | |
| 9 — YouTube details | ⏳ | |
