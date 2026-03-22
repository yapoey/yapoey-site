# Feature: Life Timeline & Milestones

## Goal
Tell your personal story visually — countries, career milestones, trips, and memorable moments.

---

## Route
Option A: Separate page `/timeline`
Option B: Section on the main GUI page between About and Resume

**Recommendation:** Both — a teaser section in the portfolio that links to a full `/timeline` page.

---

## Content Categories

### Life Milestones
| Year | Event |
|------|-------|
| 1992 | Born in Egypt |
| 2009 | Started university (Accounting — Ain Shams) |
| 2011 | Met first Korean friend during Arab Spring — sparked interest in Korea |
| 2013 | Graduated, started first web project |
| 2014 | Moved to Korea (language school — Kyung Hee) |
| 2015 | Started CS at Hanyang University |
| 2016 | First internship (Korean Gov Gangdong-gu) |
| 2019 | Graduated Hanyang, joined GeeksFamily |
| 2019 | Joined Himedi |
| 2021 | Started YouTube channel (Arabic dev content) |
| 2021 | Joined b2ggames |
| TBD | Add recent milestones |

### Countries / Trips
Track countries visited with:
- Country name + flag emoji
- Year visited
- Short note (why, what happened)

Known from bio: Egypt (home), South Korea (home), Qatar (client), ...

You need to fill in your travel history here.

### Career Highlights
- First freelance project (2012)
- First full-time job
- First product shipped to X users
- YouTube milestone (first 1k subscribers, etc.)

---

## Visual Design

### Timeline Page (`/timeline`)

Layout: Vertical scrolling timeline

```
2024 ──●── [Event description]
       |
2023 ──●── [Event description]
            [Photo thumbnail if available]
       |
2022 ──●── [Event description]
...
```

Each entry card:
- Year badge
- Category icon (career 💼 / travel ✈️ / education 🎓 / personal ⭐)
- Title
- Location (city + flag)
- Short description (2-3 sentences)
- Optional photo

**On mobile:** full-width cards stacked vertically.

### Map View (optional, future)
An interactive map showing countries visited. Use Leaflet.js or a simple SVG world map.

---

## Portfolio Section Teaser
A condensed version in the main portfolio:
- Title: "My Journey"
- 4-5 key milestones shown as horizontal cards
- "See full timeline →" link to `/timeline`

---

## Data Structure

Store timeline data in a new locale key or a separate JSON file:

```js
// locale/en.js — new section
Timeline: {
  title: "My Journey",
  events: [
    {
      year: "2011",
      category: "personal",  // career | travel | education | personal
      title: "The Korean Connection",
      location: "Egypt",
      flag: "🇪🇬",
      description: "Met my first Korean friend during the Arab Spring...",
      image: null,
    },
    ...
  ]
}
```

**Note:** Images for timeline events can be uploaded to S3 (same system as blog).

---

## Implementation Steps
1. Define the full content (you fill in the events/trips)
2. Add `Timeline` key to `locale/en.js`
3. Outsource Korean/Arabic translation to Gemini CLI
4. Build `components/TimelineSection.vue` (teaser for main page)
5. Build `pages/timeline.vue` (full page)
6. Add route to Header navigation
