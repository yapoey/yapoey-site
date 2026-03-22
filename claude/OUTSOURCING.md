# Outsourcing Map

Who does what and how to hand off tasks efficiently.

---

## Claude (This Agent) — Planning & Architecture
- Writing and maintaining all files in `claude/`
- Reviewing output from Gemini/Codex before integrating
- Complex Vue/Nuxt architecture decisions
- Debugging integration issues
- Making sure everything connects together

---

## Gemini CLI — Content & Translation

### Setup
```bash
# Install Gemini CLI
npm install -g @google/generative-ai-cli
# or use: npx @google/gemini-cli

# Set API key
export GEMINI_API_KEY=your_key_here
```

### Task 1: Translate locale to Korean
```bash
gemini "Translate the VALUES in this JS locale file to Korean. Rules:
1. Keep all object KEYS unchanged
2. Keep proper nouns in English (company names, tech stack, URLs, emails)
3. Use formal Korean (존댓말)
4. Return the complete file in same JS format
" < locale/en.js > locale/ko.new.js
# Review ko.new.js before replacing ko.js
```

### Task 2: Translate locale to Arabic
```bash
gemini "Translate the VALUES in this JS locale file to Modern Standard Arabic. Rules:
1. Keep all object KEYS unchanged
2. Keep proper nouns in English (company names, tech stack, URLs, emails)
3. Use formal professional Arabic
4. Return the complete file in same JS format
" < locale/en.js > locale/ar.new.js
```

### Task 3: Rewrite resume bullet points
```bash
gemini "Rewrite these resume experience bullet points to be ATS-friendly with strong action verbs. Keep all technical stack mentions. Start each bullet with a past-tense action verb. Keep same JSON structure." < resume_raw.json > resume_rewritten.json
```

### Task 4: Generate skills section
```bash
gemini "Based on these work experiences, generate a grouped technical skills section for a developer resume. Group by: Frontend, Backend, Database, Cloud/DevOps, Tools, Languages (human). Return as JSON array of {category, skills:[]}." < resume_raw.json
```

### Task 5: Timeline content
```bash
gemini "Given this person's background, help write short engaging descriptions (2 sentences max) for each milestone in this timeline JSON." < timeline_draft.json
```

### Task 6: Review Korean translation
```bash
gemini "Review this Korean translation for a developer portfolio. Check for naturalness, formality level, and any awkward phrases. Suggest corrections." < locale/ko.js
```

---

## Codex (OpenAI) — Code Generation

Best used for boilerplate code where patterns are well-known.

### Task 1: Tailwind CSS migration
**Prompt:**
```
Convert this Vue component from Bootstrap CSS classes to Tailwind CSS.
Keep the same semantic HTML structure.
Keep all Vue directives, data bindings, and event handlers unchanged.
Only change the CSS class names.

[paste component here]
```

### Task 2: Appwrite CRUD boilerplate
**Prompt:**
```
Write a Vue 3 composable (useAppwrite.js) for a blog post system using the Appwrite SDK.
Functions needed:
- listPosts(filters?) → paginated list
- getPost(slug) → single post
- createPost(data) → requires auth
- updatePost(id, data) → requires auth
- deletePost(id) → requires auth

Collection name: "posts"
Fields: title, slug, content, excerpt, coverImage, tags, published, publishedAt, lang

Use @appwrite/sdk. Handle errors. Return { data, error, loading } from each function.
```

### Task 3: S3 Lambda presigned URL function
**Prompt:**
```
Write an AWS Lambda function (Node.js 20) that:
1. Receives a POST request with { filename, contentType }
2. Generates an S3 presigned PUT URL valid for 5 minutes
3. Returns { uploadUrl, publicUrl }

Bucket name: yapoey.com
Key prefix: blog/
Public URL format: https://s3.eu-west-3.amazonaws.com/yapoey.com/blog/{filename}

Use @aws-sdk/client-s3 and @aws-sdk/s3-request-presigner.
Include CORS headers in response.
```

### Task 4: CLI terminal command parser
**Prompt:**
```
Write a Vue 3 composable (useTerminal.js) for a CLI-style terminal UI.
Features:
- Parse input string into { command, args }
- Maintain command history (last 50)
- Arrow up/down to navigate history
- Known commands: help, about, resume, projects, skills, contact, blog, clear, gui, exit, ask, open, lang
- Return { output: [], history: [], execute(input), clearOutput() }
- Output items have type: "input" | "output" | "error" | "ai" | "system"

No external dependencies. Pure Vue/JS.
```

### Task 5: TipTap editor with image upload
**Prompt:**
```
Write a Vue 3 component (BlogEditor.vue) using TipTap rich text editor with:
- Extensions: StarterKit, CodeBlockLowlight, Image, Link, Placeholder
- Custom toolbar with: Bold, Italic, H1, H2, H3, Code Block, Blockquote, Link, Upload Image
- Upload Image button: opens file picker, calls uploadToS3(file) async function (defined externally), inserts returned URL as image
- Props: modelValue (HTML string), disabled
- Emits: update:modelValue
- Include basic toolbar styling
```

---

## You (Mohamed) — Content & Decisions

Things only you can provide:
- [ ] Updated experience after b2ggames (dates, company, role, description)
- [ ] Skills you want to highlight
- [ ] Life timeline events (travel, milestones)
- [ ] Countries visited list
- [ ] Social media profile URLs (GitHub, LinkedIn, YouTube)
- [ ] Decision: Nuxt 2 or Nuxt 3?
- [ ] Decision: Keep Bootstrap or switch to Tailwind?
- [ ] Appwrite project setup (create account, get API keys)
- [ ] AWS: create/configure Lambda function
- [ ] New profile photo (if desired)
- [ ] YouTube channel URL
- [ ] Review and approve all translations

---

## Workflow for Each Task

```
1. Claude writes the spec/plan (in claude/ folder)
2. You (or Claude) write the prompt for Gemini/Codex
3. Gemini/Codex generates output
4. Claude reviews the output
5. Claude integrates into the codebase
6. You test and approve
```
