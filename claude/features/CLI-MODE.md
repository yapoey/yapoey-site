# Feature: CLI Mode + Gemini Integration

## Route
`/cli`

## Terminal UI

```
┌─────────────────────────────────────────────────────┐
│  yapoey.com — terminal v1.0                    [X]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ██╗   ██╗ █████╗ ██████╗  ██████╗ ███████╗██╗   │
│  ╚██╗ ██╔╝██╔══██╗██╔══██╗██╔═══██╗██╔════╝╚██╗  │
│   ╚████╔╝ ███████║██████╔╝██║   ██║█████╗   ╚██╗ │
│    ╚██╔╝  ██╔══██║██╔═══╝ ██║   ██║██╔══╝   ██╔╝ │
│     ██║   ██║  ██║██║     ╚██████╔╝███████╗██╔╝  │
│     ╚═╝   ╚═╝  ╚═╝╚═╝      ╚═════╝ ╚══════╝╚═╝   │
│                                                     │
│  Welcome! Type `help` to see available commands.   │
│  Or try one of these:                               │
│                                                     │
│  > who are you?                                     │
│  > what can you build?                              │
│  > how do I hire you?                               │
│  > show projects                                    │
│                                                     │
│  yapoey@terminal:~$ _                               │
└─────────────────────────────────────────────────────┘
```

## Commands

### Built-in Commands (no API call)
| Command | Output |
|---------|--------|
| `help` | List all commands |
| `about` | Short bio text |
| `resume` | ASCII formatted resume summary |
| `projects` | List of projects with links |
| `skills` | Skills list |
| `contact` | Email + social links |
| `blog` | Latest blog posts list |
| `open [url/project]` | Opens URL in new tab |
| `clear` | Clears terminal |
| `gui` | Redirects to /gui |
| `exit` | Redirects back to entry page |
| `lang [en/ko/ar]` | Switch language |

### AI Commands (Gemini)
| Command | Behavior |
|---------|----------|
| `ask [question]` | Sends question to Gemini with your context |
| `[any text]` | If not a known command → pass to Gemini as a question |

## Gemini Integration

### Architecture
```
User types → Frontend (Vue) → /api/gemini (Nuxt server route or Lambda) → Gemini API → Response
```

**IMPORTANT:** Never expose Gemini API key on frontend. Always proxy through server.

### System Prompt for Gemini
```
You are an AI assistant for Mohamed Ibrahim, known as YapoeY.
Answer questions about him in a fun, friendly, and professional tone.

About YapoeY:
- Full Stack Developer based in Seoul, South Korea
- Originally from Egypt
- Studied at Hanyang University (Computer Science)
- Has worked at: GeeksFamily, Himedi, b2ggames
- Skills: Vue.js, Nuxt.js, PHP/Laravel, MySQL, AWS, Docker
- Speaks Arabic, English, Korean
- Has a YouTube channel teaching web dev in Arabic
- Personal site: yapoey.com
- Contact: yapoey@gmail.com

Keep answers under 3 sentences unless it's technical.
If asked something unrelated to YapoeY, politely redirect.
Add a touch of humor where appropriate.
```

### API Route
File: `server/api/gemini.post.js` (Nuxt 3) or `api/gemini.js` (Lambda)

```js
// Input: { question: string }
// Output: { answer: string }
// Uses: GEMINI_API_KEY from env
```

## Terminal Features

### Input
- Keyboard input with blinking cursor
- Arrow up/down: command history (last 50 commands)
- Tab: autocomplete from known commands
- Enter: execute
- Ctrl+C: cancel current input

### Output
- Typewriter effect for responses (character by character)
- Color coding:
  - Commands: green
  - System messages: blue
  - Errors: red
  - AI responses: yellow/white
  - Links: cyan, clickable

### Mobile
- Virtual keyboard shows on tap
- Scrollable terminal window
- Suggested command chips shown at top (tap to run)

## Components Needed
- `pages/cli.vue` — terminal page
- `components/CLI/Terminal.vue` — main terminal container
- `components/CLI/CommandInput.vue` — input line
- `components/CLI/OutputLine.vue` — single output line
- `components/CLI/SuggestedCommands.vue` — quick command chips

## State Management
- Store in Vuex or composable:
  - `history: []` — command history
  - `output: []` — terminal lines
  - `isLoading: bool` — waiting for Gemini response

## Implementation Steps
1. Build static terminal UI (no API)
2. Implement all built-in commands
3. Add history and autocomplete
4. Build Gemini proxy endpoint
5. Connect `ask` command to Gemini
6. Make unrecognized commands fall through to Gemini
7. Add typewriter effect for AI responses
8. Mobile optimization
