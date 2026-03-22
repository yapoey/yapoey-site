# Feature: Translation Overhaul

## Current State

| Language | Status | Issues |
|----------|--------|--------|
| English (`en.js`) | Active | Outdated content, b2ggames still "Till-Now", skills empty, some copy is weak |
| Korean (`ko.js`) | Active | Needs review — likely outdated too |
| Arabic (`ar.js` / `ara.js`) | Commented out | Was built, got abandoned |

Two Arabic files exist (`ar.js` and `ara.js`) — consolidate into one.

---

## English Updates Needed

Changes that come from other phases — must update en.js after:
- Phase 4 (UI): New service names, new section labels
- Phase 5 (Resume): Experience bullet rewrites, skills section filled in
- Phase 6 (Timeline): New `Timeline` keys
- Phase 7 (Blog): New `Blog` section keys
- Phase 9 (Contact): Remove phone, update social links

Additional English fixes:
- `AboutArea.summery` → fix typo "summery" should be key `summary`
- `AboutArea.subCv` → "Detalied Cv" fix typo → "Detailed CV"
- `HeroArea.Iam` key: value "I am a " (trailing space) → ok but confirm in code
- `Common.vPhone` → remove phone number from source entirely
- `Common.vZipcode` → remove (empty and irrelevant)
- `ContactArea` → add new keys for social links
- Remove `HireArea` and `PriceArea` sections (components being removed)

---

## Korean Updates

Current ko.js has same structure as en.js. After updating en.js:

**Outsource to Gemini CLI:**
```bash
# Step 1: Export updated English locale
# Step 2: Run Gemini
gemini "You are a professional Korean translator. Translate the values in this JavaScript locale object to Korean. Rules:
- Keep all JSON/JS keys exactly as-is (do not translate keys)
- Keep proper nouns in their original form: company names, university names, tech stack (Vue.js, Laravel, etc.), city names
- Keep URLs and email addresses unchanged
- Use formal/polite Korean (존댓말)
- Return the complete JS file with same structure" < locale/en.js > locale/ko.js
```

Review: Have a Korean speaker (or you) review the output before publishing.

---

## Arabic Reactivation

Currently in `nuxt.config.js`:
```js
// import {ar} from "./locale/ar";
// ar,
```

Steps:
1. Pick either `ar.js` or `ara.js` — delete the other
2. Run Gemini translation from updated en.js
3. Add RTL support (already partially done with RTLCSS in past projects)
4. Uncomment in nuxt.config.js
5. Add `ar` to i18n locales array
6. Test RTL layout (especially for Arabic)

**Gemini CLI command:**
```bash
gemini "You are a professional Arabic translator. Translate the values in this JavaScript locale object to Modern Standard Arabic (MSA). Rules:
- Keep all JSON/JS keys exactly as-is
- Keep proper nouns: company names, tech stack, URLs, emails in English
- Arabic text should read right-to-left naturally
- Use professional formal Arabic
- Return the complete JS file" < locale/en.js > locale/ar.js
```

---

## New Translation Keys to Add

After all phases are done, en.js needs new sections:

```js
// Entry page
EntryPage: {
  greeting: "Hi, I'm YapoeY",
  subtitle: "Full Stack Developer · Seoul, Korea",
  chooseCli: "Terminal Experience",
  chooseGui: "Classic Portfolio",
  hint: "Press 1 for CLI, 2 for GUI"
}

// CLI
CLI: {
  welcome: "Welcome! Type `help` to see commands.",
  notFound: "Command not found. Type `help` or ask me anything.",
  thinking: "Thinking...",
  errorGemini: "Couldn't reach AI. Try again.",
}

// Timeline
Timeline: {
  title: "My Journey",
  subtitle: "From Egypt to South Korea and beyond",
  categories: {
    career: "Career",
    travel: "Travel",
    education: "Education",
    personal: "Personal"
  }
}

// Blog new keys
Blog: {
  readMore: "Read more",
  readingTime: "{n} min read",
  publishedOn: "Published on",
  tags: "Tags",
  share: "Share",
  noPostsYet: "No posts yet. Check back soon!",
}
```

---

## RTL Support Plan

For Arabic:
- Add `dir="rtl"` to `<html>` when locale is `ar`
- Use CSS logical properties where possible (e.g. `margin-inline-start` instead of `margin-left`)
- Test each section in RTL
- Navigation should flip
- Timeline direction should flip

---

## Process Summary

```
1. Finish all other phase content updates first
2. Finalize en.js as the source of truth
3. Run Gemini CLI → ko.js
4. Run Gemini CLI → ar.js
5. Human review each translation
6. Reactivate Arabic in nuxt.config.js
7. Test all 3 languages in browser
```
