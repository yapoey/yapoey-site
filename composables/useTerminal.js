const ASCII_ART = `
 ██╗   ██╗ █████╗ ██████╗  ██████╗ ███████╗██╗   ██╗
 ╚██╗ ██╔╝██╔══██╗██╔══██╗██╔═══██╗██╔════╝╚██╗ ██╔╝
  ╚████╔╝ ███████║██████╔╝██║   ██║█████╗   ╚████╔╝
   ╚██╔╝  ██╔══██║██╔═══╝ ██║   ██║██╔══╝    ╚██╔╝
    ██║   ██║  ██║██║     ╚██████╔╝███████╗   ██║
    ╚═╝   ╚═╝  ╚═╝╚═╝      ╚═════╝ ╚══════╝   ╚═╝`

const CAREER_START = 2019
const YEARS_EXP = new Date().getFullYear() - CAREER_START

const KNOWN_COMMANDS = [
  'help', 'about', 'whoami', 'resume', 'projects', 'skills',
  'contact', 'social', 'blog', 'education', 'languages',
  'fun', 'stats', 'clear', 'gui', 'exit', 'lang', 'ask',
  'open', 'theme', 'history', 'neofetch', 'clear',
]

const PROJECTS = [
  { id: 1, name: 'Korean Baseball League', tech: 'Nuxt.js, Vuex, SASS', type: 'Frontend', url: 'https://kbl-pc.b2ggames.net', company: 'b2ggames', desc: 'Fantasy gaming platform for Korean baseball fans with real-time competition features.' },
  { id: 2, name: 'Asian Model Festival 2021', tech: 'Nuxt.js, Vuex', type: 'Frontend', url: 'https://www.amffantasy.com/main', company: 'b2ggames', desc: 'Event website for AMF, Asia\'s biggest model competition with voting and live features.' },
  { id: 3, name: 'Himedi Medical Platform', tech: 'Vue.js, Vuex, Bootstrap, Axios, i18n', type: 'Frontend', url: 'https://himedi.com', company: 'Himedi', desc: 'Medical tourism platform connecting Korean hospitals with international patients. Multi-language (EN/AR/RU).' },
  { id: 4, name: 'GeeksFamily POS System', tech: 'Vue.js, Laravel, MySQL, Chart.js', type: 'Full Stack', url: 'http://pos.woozza.dunkul.site/', company: 'GeeksFamily', desc: 'Point-of-sale system for restaurant delivery sharing with order management and analytics.' },
  { id: 5, name: 'GeeksFamily Woozza', tech: 'Vue.js, Bootstrap, jQuery', type: 'Frontend', url: 'https://www.woozza.co.kr/', company: 'GeeksFamily', desc: 'Main company website and food ordering web application.' },
  { id: 6, name: 'Bio & Pure Cosmetics', tech: 'Laravel, Bootstrap, MySQL', type: 'Full Stack', url: '#', company: 'Freelance (Qatar)', desc: 'E-commerce website for a cosmetics brand built from scratch with full backend.' },
  { id: 7, name: 'Hanyang Social Innovation', tech: 'HTML, CSS, Bootstrap, jQuery', type: 'Frontend', url: 'http://project3.yapoey.com/index_en.html', company: 'Hanyang University', desc: 'University social innovation center website with Korean-English bilingual support.' },
  { id: 8, name: 'Galaxy 3D', tech: 'Three.js, WebGL', type: 'Creative', url: 'https://s3.eu-west-3.amazonaws.com/yapoey.com/assets/sites/Galaxy/index.html', company: 'Personal', desc: 'Interactive 3D galaxy simulation with particle effects in the browser.' },
  { id: 9, name: 'YapoeY Logo 3D', tech: 'Three.js, WebGL', type: 'Creative', url: 'https://wbgl-3d-text-snowy.vercel.app/', company: 'Personal', desc: '3D floating text logo rendered with Three.js matcap materials.' },
  { id: 10, name: 'Haunted House 3D', tech: 'Three.js, WebGL', type: 'Creative', url: '#', company: 'Personal', desc: 'Spooky 3D haunted house scene with dynamic lighting and textures.' },
  { id: 11, name: 'Wave Particles', tech: 'Three.js, WebGL', type: 'Creative', url: '#', company: 'Personal', desc: 'Animated wave particle system experiment with interactive controls.' },
]

const EXPERIENCE_DATA = `
Sibel Health International (2022/10 ~ Present) Senior Frontend Developer & Frontend Team Lead, Full-time, Seoul Korea & US
- Lead frontend team across Korea and US offices
- Built Discovery Hub, migrated entire React codebase to Vue.js from scratch (256 commits)
- Created Sibel Health Design System (atomic design), extracted as npm workspace package
- Built Central Monitoring (Tucana), real-time 64-patient monitoring via WebSocket (79 commits)
- Traveled to US 2024 to fix critical Maternal project issues, helped achieve FDA approval
- Created mock server, E2E testing (Cypress), unit testing (Jest), GitHub Actions CI
- Tech: Vue.js, Next.js, TypeScript, SCSS, WebSocket, Docker, Cypress, Jest, Monorepo

YapoeY Bit (2022/10 ~ Present) Product Manager & Technical Lead, Studio, Seoul Korea
- Founded development studio, leading frontend/backend/mobile teams
- Delivered 10+ products for clients in Korea, Egypt, Qatar, Japan
- Key projects: NooN Center (education platform, 576 commits), Russian Whale (compound management, 547 commits), bizNavi (enterprise mobile app, 816 commits), ChaiTalk (social app, 193 commits), Layun (CMS, 285 commits), Seoul Bird (bird watching platform), Meya-Meya (AI restaurant ordering), cTask, West East Forte
- Total: ~3000 commits across all studio projects
- Tech: Vue, Nuxt, Next.js, React, Flutter, Node.js, Express, NestJS, MySQL, PostgreSQL, DynamoDB, Redis, AWS, Docker

b2ggames (2021/12 ~ 2022/10) Frontend Developer, Full-time, Seoul Korea
- Built AMF event website and Korean Baseball League gaming platform
- Tech: Nuxt.js, Vuex, SASS, Jira, Bitbucket

Himedi (2019/12 ~ 2021/11) Frontend Developer, Full-time, Seoul Korea
- Built medical tourism platform from scratch, 3 languages (EN/AR/RU) with RTL
- Tech: Vue.js, Vuex, Bootstrap 4, Webpack, Axios, i18n, RTLCSS

GeeksFamily (2019/02 ~ 2019/11) Full Stack Developer, Full-time, Seoul Korea
- Built POS system, delivery sharing, food ordering app
- Tech: Vue.js, Laravel, MySQL, Chart.js

Bio & Pure (2016/05 ~ 2018/08) Full Stack Developer, Freelance, Qatar
- Built cosmetics e-commerce from scratch
- Tech: Laravel, Bootstrap 4, MySQL
`

const SKILLS_DATA = `
Frontend: Vue.js, Nuxt.js, React, Next.js, Flutter, TypeScript, JavaScript ES6+, HTML5, CSS3, SASS, Tailwind CSS, Bootstrap
Backend: Node.js, Express, NestJS, PHP, Laravel
Database: MySQL, PostgreSQL, DynamoDB, Redis
Cloud/DevOps: AWS (S3, Lambda, EC2), Docker, Google Cloud, Vercel
Testing: Cypress (E2E), Jest (unit), GitHub Actions CI
Tools: Git, GitHub, Bitbucket, Jira, Notion, Figma
Languages: Arabic (native), English (fluent), Korean (conversational)
`

const FUN_FACTS = [
  "I've visited 22+ countries and counting!",
  "I started my career in Egypt building construction company websites.",
  "I met my first Korean friend during the Arab Spring in 2011, that's what brought me to Korea.",
  "I have two bachelor's degrees: Accounting and Computer Science.",
  "I run a YouTube channel teaching web development in Arabic.",
  "I once designed a company uniform. Yes, the actual clothes.",
  "I can debug in three languages: Arabic, English, and Korean.",
  "My name YapoeY reads the same forwards and backwards... almost.",
  "I learned Korean at Kyung Hee University before switching to CS at Hanyang.",
  "I've worked on medical platforms, gaming competitions, food delivery, and cosmetics. Quite the range!",
]

export function useTerminal() {
  const output = ref([])
  const commandHistory = ref([])
  const historyIndex = ref(-1)
  const isLoading = ref(false)
  const currentTheme = ref('dark')

  function addLine(text, type = 'system') {
    output.value.push({ text, type, id: Date.now() + Math.random() })
  }

  function addLines(text, type = 'system') {
    text.split('\n').forEach(line => addLine(line, type))
  }

  function addBlank() {
    addLine('', 'system')
  }

  function init() {
    addLines(ASCII_ART, 'ascii')
    addBlank()
    addLine('  Welcome to YapoeY Terminal v1.0', 'highlight')
    addLine('  Type `help` or `/` to see available commands.', 'info')
    addBlank()
    addLine('  Suggested:', 'muted')
    addLine('    > whoami', 'suggest')
    addLine('    > projects', 'suggest')
    addLine('    > fun', 'suggest')
    addLine('    > ask who is yapoey?', 'suggest')
    addBlank()
  }

  function getAutocomplete(partial) {
    if (!partial) return null
    const match = KNOWN_COMMANDS.find(c => c.startsWith(partial.toLowerCase()))
    return match || null
  }

  async function askAI(prompt) {
    try {
      const res = await $fetch('/api/gemini', {
        method: 'POST',
        body: { question: prompt },
      })
      return res.answer
    } catch {
      return null
    }
  }

  async function aiCommand(command, dataContext, creativePrompt) {
    isLoading.value = true
    const aiResult = await askAI(
      `You are displaying information inside a CLI terminal on a portfolio website. The user typed "${command}".

${creativePrompt}

DATA:
${dataContext}

STRICT OUTPUT RULES:
- Output ONLY plain text. NO markdown, NO backticks, NO code blocks, NO **, NO ##
- Do NOT draw boxes, frames, or borders (no ┌ ┐ └ ┘ │ ├ ┤ ─ characters)
- Do NOT add a fake terminal prompt like "yapoey@" at the end
- You can use → ★ ● ▸ and emoji
- Include ALL the data provided. Do not skip or summarize away details
- Keep it between 8-20 lines
- Be creative, conversational, and fun. Like a person talking, not a template
- For skills/technical data: use aligned columns with consistent spacing, one item per line
- For lists: use ▸ as bullet, align values with spaces
- Add a blank line between categories for readability`
    )
    isLoading.value = false

    if (aiResult) {
      // Clean any markdown artifacts the AI might still sneak in
      const cleaned = aiResult
        .replace(/```[\w]*/g, '')
        .replace(/```/g, '')
        .replace(/\*\*/g, '')
        .replace(/^#+\s/gm, '')
        .trim()

      cleaned.split('\n').forEach(line => {
        if (line.startsWith('→') || line.startsWith('▸') || line.startsWith('★')) {
          addLine('  ' + line, 'success')
        } else if (line.startsWith('!') || line.startsWith('⚠')) {
          addLine('  ' + line, 'error')
        } else if (line.trim() === '') {
          addBlank()
        } else {
          addLine('  ' + line, 'ai')
        }
      })
    } else {
      return false
    }
    return true
  }

  async function execute(input) {
    const trimmed = input.trim()
    if (!trimmed) return

    addLine(`yapoey@terminal:~$ ${trimmed}`, 'command')
    commandHistory.value.unshift(trimmed)
    historyIndex.value = -1

    // Strip leading / so /theme works like theme
    const cleaned = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed
    const parts = cleaned.split(' ')
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1).join(' ')

    switch (cmd) {
      case 'help': runHelp(); break
      case 'about': case 'whoami':
        await aiCommand('whoami',
          `Name: Mohamed Ibrahim (YapoeY), ${YEARS_EXP}+ years experience, Full Stack Developer, Seoul South Korea, from Egypt, Hanyang University CS degree, speaks Arabic/English/Korean, 32 countries visited, YouTube channel teaching web dev in Arabic, worked at b2ggames/Himedi/GeeksFamily`,
          'Introduce YapoeY in a creative and memorable way. Make it feel like a real person talking about themselves in a terminal. Show personality.'
        )
        break
      case 'resume':
        await aiCommand('resume', EXPERIENCE_DATA,
          'Present this career experience in a creative CLI-friendly way. Highlight the progression and diversity of work. Make it scannable but interesting.'
        )
        break
      case 'projects':
        if (args) {
          await runFilteredProjects(args)
        } else {
          await runProjects()
        }
        break
      case 'skills':
        await aiCommand('skills', SKILLS_DATA,
          `Present these technical skills in a clean, structured format. Use this layout:
Category name with emoji header, then one skill per line with aligned columns like:
  ▸ Vue.js          ████████░░  Expert
  ▸ Laravel          ███████░░░  Advanced
Group by: Frontend, Backend, Database, Cloud/DevOps, Tools, Languages. Add a blank line between groups.`
        )
        break
      case 'contact': runContact(); break
      case 'social': runSocial(); break
      case 'blog': runBlog(); break
      case 'education':
        await aiCommand('education',
          'Hanyang University 2015-2019 Computer Science Seoul Korea, Kyung Hee University 2014-2015 Korean Language Seoul, Ain Shams University 2009-2013 Accounting Cairo Egypt',
          'Present this educational journey in a creative way. Show the unique path from Accounting in Egypt to Computer Science in Korea. Tell the story.'
        )
        break
      case 'languages':
        await aiCommand('languages',
          'Arabic: native (from Egypt), English: fluent (professional working language), Korean: conversational (living in Korea since 2014)',
          'Present these language skills creatively. Show the journey of learning each language and how they connect to the life story.'
        )
        break
      case 'fun': runFun(); break
      case 'stats': runStats(); break
      case 'neofetch': runNeofetch(); break
      case 'history': runHistory(); break
      case 'open':
        runOpen(args)
        break
      case 'theme':
        runTheme(args)
        break
      case 'clear':
        output.value = []
        addLines(ASCII_ART, 'ascii')
        addBlank()
        return
      case 'gui':
        navigateTo('/gui')
        return
      case 'exit':
        localStorage.removeItem('yapoey_mode')
        navigateTo('/')
        return
      case 'lang':
        addLine(args ? `Language switched to: ${args}` : 'Usage: lang [en|ko|ar]', 'info')
        break
      case 'ask':
        if (args) {
          await askGemini(args)
        } else {
          addLine('Usage: ask [your question]', 'error')
          addLine('Example: ask what technologies does yapoey use?', 'muted')
        }
        break
      case 'sudo':
        addLine('Nice try! You don\'t have root access here.', 'error')
        break
      case 'ls':
        addLine('about.txt  projects/  resume.pdf  skills.json  contact.vcf', 'info')
        break
      case 'cd': addLine('You\'re already home. Try `help` instead.', 'info'); break
      case 'pwd': addLine('/home/yapoey/portfolio', 'info'); break
      case 'cat': addLine('Try: whoami, resume, projects, skills, contact', 'info'); break
      default:
        await askGemini(trimmed)
        break
    }
    addBlank()
  }

  function runHelp() {
    addLine('┌─── Commands ──────────────────────────────────┐', 'highlight')
    addBlank()
    addLine('  whoami      Who is YapoeY?', 'info')
    addLine('  resume      Career journey', 'info')
    addLine('  education   Academic path', 'info')
    addLine('  projects    Portfolio (use: projects vue)', 'info')
    addLine('  skills      Tech stack', 'info')
    addLine('  languages   Human languages', 'info')
    addLine('  contact     How to reach me', 'info')
    addLine('  social      Social links', 'info')
    addLine('  stats       Quick numbers', 'info')
    addLine('  fun         Random fun fact', 'info')
    addLine('  neofetch    Dev-style system info', 'info')
    addBlank()
    addLine('  ask [?]     Ask AI anything about me', 'ai')
    addLine('  open [id]   Open project in browser', 'info')
    addLine('  clear       Clear terminal', 'info')
    addLine('  gui         Switch to GUI mode', 'info')
    addLine('  history     Command history', 'info')
    addLine('  exit        Back to landing', 'info')
    addBlank()
    addLine('  Tip: type / to browse commands', 'suggest')
    addBlank()
    addLine('└──────────────────────────────────────────────┘', 'highlight')
  }

  async function runProjects() {
    const projectSummary = PROJECTS.map(p =>
      `[${p.id}] ${p.name}: ${p.desc} (${p.tech}) [${p.type}] @ ${p.company}${p.url !== '#' ? ' LIVE' : ''}`
    ).join('\n')

    const ok = await aiCommand('projects', projectSummary,
      `Present these projects in a clean structured way. For each project show on separate lines:
  [id] Project Name
       Tech: ...
       @ Company: short description
       🔗 LIVE (if it has a live URL)
Group them by type (Professional, Creative/Personal). Show all projects.`
    )
    if (!ok) {
      // Fallback
      PROJECTS.forEach(p => {
        addLine(`  [${p.id}] ${p.name}`, 'info')
        addLine(`      ${p.desc}`, 'muted')
      })
    }
    addLine('  Use `open [id]` to open a project. e.g. open 1', 'suggest')
  }

  async function runFilteredProjects(filter) {
    const filtered = PROJECTS.filter(p =>
      p.type.toLowerCase().includes(filter.toLowerCase()) ||
      p.company.toLowerCase().includes(filter.toLowerCase()) ||
      p.tech.toLowerCase().includes(filter.toLowerCase()) ||
      p.name.toLowerCase().includes(filter.toLowerCase())
    )

    if (filtered.length === 0) {
      addLine(`No projects matching "${filter}"`, 'error')
      addLine('Try: projects vue | projects three | projects b2ggames | projects frontend', 'muted')
      return
    }

    const summary = filtered.map(p =>
      `[${p.id}] ${p.name}: ${p.desc} (${p.tech}) @ ${p.company}`
    ).join('\n')

    const ok = await aiCommand(`projects ${filter}`, summary,
      `The user filtered projects by "${filter}". Present these matching projects creatively. Show IDs for the open command.`
    )
    if (!ok) {
      filtered.forEach(p => {
        addLine(`  [${p.id}] ${p.name}: ${p.tech}`, 'info')
      })
    }
    addLine('  Use `open [id]` to open a project.', 'suggest')
  }

  function runOpen(args) {
    if (!args) {
      addLine('Usage: open [project id or name]', 'error')
      addLine('Example: open 1  or  open galaxy', 'muted')
      addBlank()
      addLine('Projects:', 'info')
      PROJECTS.forEach(p => {
        const status = p.url !== '#' ? '🔗' : '  '
        addLine(`  ${status} [${p.id}] ${p.name}`, 'muted')
      })
      return
    }

    // Try by ID first
    const byId = PROJECTS.find(p => p.id === parseInt(args))
    // Then by name
    const byName = PROJECTS.find(p => p.name.toLowerCase().includes(args.toLowerCase()))
    const project = byId || byName

    if (!project) {
      addLine(`Project "${args}" not found.`, 'error')
      addLine('Type `open` to see all projects with IDs.', 'muted')
      return
    }

    if (project.url === '#') {
      addLine(`${project.name}: no live URL available (personal/offline project).`, 'info')
      addLine('Switch to GUI mode to see screenshots: type `gui`', 'suggest')
      return
    }

    window.open(project.url, '_blank')
    addLine(`Opening ${project.name}...`, 'success')
    addLine(`  ${project.url}`, 'muted')
  }

  function runContact() {
    addLine('┌─── Contact ───────────────────────────────────┐', 'highlight')
    addBlank()
    addLine('  📧  me@yapoey.com', 'info')
    addLine('  📍  Seoul, South Korea', 'info')
    addLine('  🌐  yapoey.com', 'info')
    addBlank()
    addLine('  Type `social` for social links.', 'suggest')
    addLine('  Type `gui` → contact form.', 'suggest')
    addBlank()
    addLine('└──────────────────────────────────────────────┘', 'highlight')
  }

  function runSocial() {
    addLine('┌─── Social ────────────────────────────────────┐', 'highlight')
    addBlank()
    addLine('  GitHub     github.com/yapoey', 'info')
    addLine('  LinkedIn   linkedin.com/in/yapoey', 'info')
    addLine('  YouTube    youtube.com/c/yapoey-tech', 'info')
    addBlank()
    addLine('└──────────────────────────────────────────────┘', 'highlight')
  }

  function runBlog() {
    addLine('┌─── Blog ──────────────────────────────────────┐', 'highlight')
    addBlank()
    addLine('  Blog system coming soon.', 'info')
    addLine('  YouTube: youtube.com/c/yapoey-tech', 'info')
    addLine('  Web development tutorials in Arabic.', 'muted')
    addBlank()
    addLine('└──────────────────────────────────────────────┘', 'highlight')
  }

  function runFun() {
    const fact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]
    addLine('┌─── Fun Fact 🎲 ─────────────────────────────┐', 'highlight')
    addBlank()
    addLine(`  ${fact}`, 'ai')
    addBlank()
    addLine('  Run `fun` again for another!', 'suggest')
    addBlank()
    addLine('└──────────────────────────────────────────────┘', 'highlight')
  }

  function runStats() {
    addLine(`  ${YEARS_EXP}+   Years of experience`, 'info')
    addLine('  15+   Projects shipped', 'info')
    addLine('  6000+ Commits', 'info')
    addLine('  22+   Countries visited', 'info')
    addLine('   3    Languages spoken', 'info')
    addLine('   6    Companies worked at', 'info')
    addLine('   2    Bachelor degrees', 'info')
    addLine('   1    YouTube channel', 'info')
  }

  function runNeofetch() {
    addBlank()
    addLine('  yapoey@portfolio', 'highlight')
    addLine('  ─────────────────', 'highlight')
    addLine(`  OS:        macOS / Seoul timezone`, 'info')
    addLine(`  Uptime:    ${YEARS_EXP} years in tech`, 'info')
    addLine('  Shell:     yapoey-terminal v1.0', 'info')
    addLine('  Editor:    VS Code / WebStorm', 'info')
    addLine('  Framework: Nuxt 3 + Vue 3', 'info')
    addLine('  CSS:       Tailwind + SCSS', 'info')
    addLine('  Backend:   Laravel / Node.js', 'info')
    addLine('  DB:        MySQL / PostgreSQL', 'info')
    addLine('  Cloud:     AWS / Docker', 'info')
    addLine('  Language:  AR / EN / KO', 'info')
    addLine('  Theme:     Dark (always)', 'info')
  }

  function runTheme(args) {
    const available = ['dark', 'hacker', 'ocean', 'sunset', 'purple']

    if (!args || !available.includes(args)) {
      addLine('Available themes:', 'info')
      available.forEach(t => {
        addLine(`  ▸ ${t}${t === currentTheme.value ? '  ← current' : ''}`, t === currentTheme.value ? 'success' : 'muted')
      })
      addBlank()
      addLine('Usage: theme dark | theme hacker | theme ocean', 'suggest')
      return
    }

    currentTheme.value = args
    addLine(`Theme switched to: ${args}`, 'success')
  }

  function runHistory() {
    if (commandHistory.value.length === 0) {
      addLine('No command history yet.', 'muted')
      return
    }
    addLine('┌─── History ───────────────────────────────────┐', 'highlight')
    commandHistory.value.slice(0, 20).forEach((cmd, i) => {
      addLine(`  ${i + 1}. ${cmd}`, 'muted')
    })
    addLine('└──────────────────────────────────────────────┘', 'highlight')
  }

  async function askGemini(question) {
    isLoading.value = true

    try {
      const res = await $fetch('/api/gemini', {
        method: 'POST',
        body: { question },
      })
      addLine('┌─── AI ────────────────────────────────────────┐', 'highlight')
      addBlank()
      res.answer.split('\n').forEach(line => addLine(`  ${line}`, 'ai'))
      addBlank()
      addLine('└──────────────────────────────────────────────┘', 'highlight')
    } catch {
      addLine('AI is not available right now.', 'error')
    } finally {
      isLoading.value = false
    }
  }

  return {
    output,
    commandHistory,
    historyIndex,
    isLoading,
    currentTheme,
    init,
    execute,
    getAutocomplete,
  }
}
