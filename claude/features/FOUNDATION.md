# Feature: Foundation & Cleanup

## Goal
Clean up technical debt before adding new features. This is the prerequisite for everything else.

---

## 1. Framework: Migrate to Nuxt 3 ✅

**Decided.** Migration steps:

1. Create a fresh Nuxt 3 project alongside the existing one
2. Port pages and components one by one (start with simplest)
3. Replace Vuex store with Pinia (Nuxt 3 default)
4. Replace `nuxt-i18n` v6 with `@nuxtjs/i18n` v8 (Nuxt 3 compatible)
5. Replace `@nuxtjs/axios` with native `$fetch` / `useFetch` composables
6. Replace `@nuxtjs/google-analytics` with `@nuxtjs/gtag`
7. Remove `NODE_OPTIONS=--openssl-legacy-provider` hack entirely
8. Move `middleware/init.js` to Nuxt 3 middleware format

Key Nuxt 3 wins to use:
- `server/api/` routes (for Gemini proxy, no Lambda needed)
- Auto-imports (no more `import X from '~/components/X'`)
- `useRuntimeConfig()` for env vars
- `useFetch` / `useAsyncData` for data fetching

---

## 2. CSS Framework: Tailwind CSS ✅

**Decided.** Replace Bootstrap 4 + custom CSS with Tailwind.

Setup in Nuxt 3:
```bash
npm install -D tailwindcss @tailwindcss/typography
npx tailwindcss init
```

`nuxt.config.ts`:
```ts
modules: ['@nuxtjs/tailwindcss']
```

`tailwind.config.ts`:
```ts
export default {
  darkMode: 'class',   // enables dark: variants, controlled by class on <html>
  content: ['./components/**/*.vue', './pages/**/*.vue', './layouts/**/*.vue'],
  theme: {
    extend: {
      // custom colors, fonts defined here
    }
  }
}
```

**Migration approach (outsource to Codex):**
1. Per component: provide HTML + current CSS → Codex rewrites classes to Tailwind
2. Review and adjust
3. Remove Bootstrap CSS/JS from assets after all components migrated

**Files to remove after migration:**
- `static/assets/css/bootstrap.min.css` and `bootstrap.min.js`
- All other static CSS files (fold into Tailwind or component `<style>`)
- `sass` and `sass-loader` dev dependencies

---

## 3. Remove jQuery

jQuery is imported globally in `nuxt.config.js` scripts array. Used for: slicknav, scrollUp, isotope, owl.carousel, slick.

Replacements:
| Current | Replace with |
|---------|-------------|
| jQuery + slicknav | CSS + Vue mobile menu |
| owl.carousel | Swiper.js or CSS scroll snap |
| slick | Same |
| isotope | CSS grid + Vue filter logic |
| scrollUp | CSS scroll-behavior + Vue component |
| typed.js | vue-typed-js (already installed) |

**Action:** Remove all jQuery scripts from nuxt.config.js head.scripts after replacing functionality.

---

## 4. Update Google Analytics to GA4

Current: `UA-179550389-1` — Universal Analytics (deprecated July 2023, no longer collecting data)

Action:
- Create GA4 property at analytics.google.com
- Get new `G-XXXXXXXXXX` measurement ID
- Replace `@nuxtjs/google-analytics` with `@nuxtjs/gtag` or manual script
- Update all `$ga.event()` calls to GA4 `gtag('event', ...)` format

---

## 5. Environment Variables

Currently hardcoded in source:
- EmailJS service ID, template ID, user key (`ContactArea.vue:134`)
- Google Analytics ID (`nuxt.config.js:80`)
- Phone number in locale (`locale/en.js:388`)

Action:
- Create `.env` file (add to `.gitignore`)
- Create `.env.example` with placeholder values
- Move all sensitive values to `process.env.XXX`

```
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_USER_KEY=
GA_MEASUREMENT_ID=
GEMINI_API_KEY=        # for CLI mode
```

---

## 6. Remove Dead/Unused Code

Components currently commented out in `pages/index.vue`:
- `PriceArea` — remove component and file
- `HireArea` — remove component and file
- `TestimonialArea` — remove component and file
- `BlogArea` — keep file, will reactivate after blog system

Locale keys to remove: HireArea section in en.js and ko.js

---

## 7. File Structure Cleanup (target)

```
yapoey-site/
  assets/          # CSS vars, global styles
  components/
    layout/        # Header, Footer
    sections/      # HeroArea, AboutArea, etc.
    cli/           # Terminal components
    blog/          # Blog components
    common/        # Shared: Modal, Button, etc.
  pages/
    index.vue      # Entry page (CLI vs GUI choice)
    gui.vue        # Main portfolio
    cli.vue        # Terminal
    blog/          # Blog pages
    resume.vue     # Interactive resume
    timeline.vue   # Life timeline
  server/
    api/
      gemini.post.js   # Gemini proxy
  locale/
    en.js
    ko.js
    ar.js
  claude/          # Planning docs
```

---

## Estimated Effort
- Nuxt 2 → 3 migration: 2-3 days
- Bootstrap → Tailwind: 3-5 days (with Codex help: ~2 days)
- jQuery removal: 1 day
- GA4 update: 2 hours
- Env vars cleanup: 2 hours
- File structure cleanup: 2 hours
