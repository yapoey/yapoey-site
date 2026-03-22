const ASCII_ART = `
 ██╗   ██╗ █████╗ ██████╗  ██████╗ ███████╗██╗   ██╗
 ╚██╗ ██╔╝██╔══██╗██╔══██╗██╔═══██╗██╔════╝╚██╗ ██╔╝
  ╚████╔╝ ███████║██████╔╝██║   ██║█████╗   ╚████╔╝
   ╚██╔╝  ██╔══██║██╔═══╝ ██║   ██║██╔══╝    ╚██╔╝
    ██║   ██║  ██║██║     ╚██████╔╝███████╗   ██║
    ╚═╝   ╚═╝  ╚═╝╚═╝      ╚═════╝ ╚══════╝   ╚═╝`

const WELCOME_MSG = `Welcome! Type \`help\` to see available commands.
Or try one of these:

  > who are you?
  > what can you build?
  > show projects`

const KNOWN_COMMANDS = ['help', 'about', 'resume', 'projects', 'skills', 'contact', 'blog', 'clear', 'gui', 'exit', 'lang']

export function useTerminal() {
  const output = ref([])
  const commandHistory = ref([])
  const historyIndex = ref(-1)
  const isLoading = ref(false)

  function addLine(text, type = 'system') {
    output.value.push({ text, type, id: Date.now() + Math.random() })
  }

  function addLines(text, type = 'system') {
    text.split('\n').forEach(line => addLine(line, type))
  }

  function init() {
    addLines(ASCII_ART, 'ascii')
    addLine('')
    addLines(WELCOME_MSG, 'info')
    addLine('')
  }

  function getAutocomplete(partial) {
    if (!partial) return null
    const match = KNOWN_COMMANDS.find(c => c.startsWith(partial.toLowerCase()))
    return match || null
  }

  async function execute(input) {
    const trimmed = input.trim()
    if (!trimmed) return

    addLine(`yapoey@terminal:~$ ${trimmed}`, 'command')
    commandHistory.value.unshift(trimmed)
    historyIndex.value = -1

    const cmd = trimmed.toLowerCase()
    const args = trimmed.split(' ').slice(1).join(' ')

    switch (cmd.split(' ')[0]) {
      case 'help':
        runHelp()
        break
      case 'about':
        runAbout()
        break
      case 'resume':
        runResume()
        break
      case 'projects':
        runProjects()
        break
      case 'skills':
        runSkills()
        break
      case 'contact':
        runContact()
        break
      case 'blog':
        runBlog()
        break
      case 'clear':
        output.value = []
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
        }
        break
      default:
        // Unknown command → try Gemini
        await askGemini(trimmed)
        break
    }
    addLine('')
  }

  function runHelp() {
    addLines(`Available commands:
  help        Show this help message
  about       Short bio
  resume      Experience summary
  projects    List of projects
  skills      Technical skills
  contact     Contact information
  blog        Latest blog posts
  clear       Clear terminal
  gui         Switch to GUI mode
  exit        Back to entry page
  lang [code] Switch language (en/ko/ar)
  ask [?]     Ask AI anything about YapoeY`, 'info')
  }

  function runAbout() {
    addLines(`Mohamed Ibrahim (YapoeY)
Full Stack Developer based in Seoul, South Korea
Originally from Egypt — studied CS at Hanyang University
${new Date().getFullYear() - 2012}+ years building web applications
Speaks Arabic, English, and Korean
YouTube channel teaching web dev in Arabic`, 'info')
  }

  function runResume() {
    addLines(`Experience:
  b2ggames          2021/12 - Present   Frontend Developer
  Himedi            2019/12 - 2021/11   Frontend Developer
  GeeksFamily       2019/02 - 2019/11   Full-stack Developer
  Bio & Pure        2016/05 - 2018/08   Full Stack Developer

Education:
  Hanyang University    2015-2019   Computer Science
  Kyung Hee University  2014-2015   Korean Language
  Ain Shams University  2009-2013   Accounting

Type "gui" to see the full interactive resume.`, 'info')
  }

  function runProjects() {
    addLines(`Projects:
  [1] Korean Baseball League    kbl-pc.b2ggames.net
  [2] Asian Model Festival      amffantasy.com
  [3] Himedi                    himedi.com
  [4] Galaxy 3D                 Three.js experiment
  [5] GeeksFamily POS           Full-stack delivery system
  [6] YapoeY Logo 3D            Three.js text

Type "gui" then scroll to Works to see screenshots.`, 'info')
  }

  function runSkills() {
    addLines(`Frontend:  Vue.js, Nuxt.js, HTML5, CSS3, SASS, Bootstrap, JavaScript
Backend:   PHP, Laravel, Node.js, Express.js
Database:  MySQL, PostgreSQL
Cloud:     AWS (S3, Lambda), Google Cloud, Docker
Tools:     Git, GitHub, Bitbucket, Jira, Notion
Languages: Arabic (native), English (fluent), Korean (conversational)`, 'info')
  }

  function runContact() {
    addLines(`Email:    yapoey@gmail.com
GitHub:   github.com/yapoey
LinkedIn: linkedin.com/in/yapoey
YouTube:  youtube.com/c/yapoey-tech
Location: Seoul, South Korea`, 'info')
  }

  function runBlog() {
    addLine('Blog coming soon — being connected to Appwrite.', 'info')
    addLine('Type "gui" and navigate to /blog for current content.', 'info')
  }

  async function askGemini(question) {
    isLoading.value = true
    addLine('Thinking...', 'loading')

    try {
      const res = await $fetch('/api/gemini', {
        method: 'POST',
        body: { question },
      })
      // Remove the "Thinking..." line
      output.value = output.value.filter(l => l.type !== 'loading')
      addLines(res.answer, 'ai')
    } catch (err) {
      output.value = output.value.filter(l => l.type !== 'loading')
      addLine('AI is not configured yet. Set GEMINI_API_KEY in .env to enable.', 'error')
    } finally {
      isLoading.value = false
    }
  }

  return {
    output,
    commandHistory,
    historyIndex,
    isLoading,
    init,
    execute,
    getAutocomplete,
  }
}
