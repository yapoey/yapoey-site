# Feature: Intro / Entry Page

## Route
`/` (becomes the new landing page)
Current portfolio content moves to `/gui`

## UX Flow

```
User visits yapoey.com
        |
        v
[ Full screen intro page ]
"Hi, I'm YapoeY"
"How do you want to explore?"

    [  > CLI  ]    [  GUI  ]
   (keyboard: 1)  (keyboard: 2)
        |               |
        v               v
     /cli            /gui (current site)
```

## Design

- Full viewport height
- Dark background (like a terminal) with subtle animated particles or gradient
- Center content only:
  - Small animated text: "Hi, I'm YapoeY" (typewriter effect)
  - Subtitle: "Full Stack Developer · Seoul, Korea"
  - Two large buttons side by side
- Keyboard shortcut hint shown: `[1] CLI  [2] GUI`
- On mobile: show GUI by default, still show CLI option as secondary

## Button Styles

CLI button:
- Dark bg, green text, monospace font
- Hover: terminal cursor blink effect
- Icon: `>`

GUI button:
- Gradient or glassmorphism
- Hover: subtle glow
- Icon: grid/layout icon

## Animation Sequence (on load)
1. Background fades in (0.3s)
2. Name types in (0.8s)
3. Subtitle fades in (0.3s delay)
4. Buttons slide up (0.3s delay)
5. Keyboard hint fades in last

## Returning Visitor (Cookie-based)
- Store choice in localStorage: `yapoey_mode = "cli" | "gui"`
- On next visit, skip intro and go directly to their preferred mode
- Show small link at top: "Switch to CLI/GUI"

## Components Needed
- `pages/index.vue` — rewrite as entry page
- `components/EntryPage/IntroAnimation.vue`
- `components/EntryPage/ModeButton.vue`

## Implementation Notes
- Use `vue-typed-js` (already installed) for typewriter effect
- Redirect logic in `middleware/init.js` for returning visitors
- Both routes should work independently (direct URL to /cli or /gui)
