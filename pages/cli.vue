<template>
  <div class="h-dvh flex flex-col font-mono text-sm" :style="terminalStyle">
    <!-- Top bar -->
    <div class="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-gray-800 flex-shrink-0" :style="{ background: 'var(--cli-surface)' }">
      <span class="text-gray-500 text-xs">yapoey.com terminal v1.0</span>
      <div class="flex items-center gap-3">
        <NuxtLink to="/gui" class="text-xs text-gray-500 hover:text-primary transition-colors">
          GUI
        </NuxtLink>
        <button
          class="text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
          @click="exitTerminal"
        >
          &times;
        </button>
      </div>
    </div>

    <!-- Suggested commands (mobile) -->
    <div class="flex gap-2 px-3 py-2 border-b border-gray-800 md:hidden overflow-x-auto flex-shrink-0 scrollbar-hide" :style="{ background: 'var(--cli-surface)' }">
      <button
        v-for="cmd in suggestedCmds"
        :key="cmd"
        class="px-3 py-1.5 text-xs rounded-lg bg-[#1a1a25] text-green-400 border border-gray-700 hover:border-green-500 transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
        @click="runSuggested(cmd)"
      >
        {{ cmd }}
      </button>
    </div>

    <!-- Terminal output -->
    <div
      ref="terminalOutput"
      class="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-0.5 min-h-0"
      @click="focusInput"
    >
      <div
        v-for="line in output"
        :key="line.id"
        class="whitespace-pre-wrap break-words leading-relaxed overflow-x-auto"
        :class="[lineClass(line.type), line.type === 'ascii' ? 'text-[10px] sm:text-sm leading-none' : '']"
      >{{ line.text }}</div>

      <!-- Loading indicator -->
      <div v-if="isLoading" class="text-yellow-400 animate-pulse">
        Thinking...
      </div>
    </div>

    <!-- Command palette (slash menu) -->
    <div
      v-if="showCommandPalette"
      class="mx-3 sm:mx-4 mb-1 rounded-xl bg-[#1a1a25] border border-gray-700 overflow-hidden max-h-48 sm:max-h-64 overflow-y-auto flex-shrink-0"
    >
      <div
        v-for="(cmd, i) in filteredCommands"
        :key="cmd.name"
        class="flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-2.5 cursor-pointer transition-colors"
        :class="i === selectedPaletteIndex ? 'bg-primary/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'"
        @click="pickCommand(cmd.name)"
        @mouseenter="selectedPaletteIndex = i"
      >
        <span class="text-base sm:text-lg w-5 sm:w-6 text-center">{{ cmd.icon }}</span>
        <div class="flex-1 min-w-0">
          <span class="text-sm font-medium" :class="i === selectedPaletteIndex ? 'text-white' : 'text-gray-300'">{{ cmd.name }}</span>
          <span class="text-xs text-gray-500 ml-2 hidden sm:inline">{{ cmd.desc }}</span>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-800 flex-shrink-0" :style="{ background: 'var(--cli-surface)' }">
      <div class="flex items-center gap-2">
        <span class="flex-shrink-0 text-xs sm:text-sm" :style="{ color: 'var(--cli-green)' }">
          <span class="hidden sm:inline">yapoey@terminal:~$</span>
          <span class="sm:hidden">~$</span>
        </span>
        <input
          ref="inputEl"
          v-model="currentInput"
          type="text"
          class="flex-1 bg-transparent outline-none placeholder-gray-600 min-w-0 text-sm"
          :style="{ color: 'var(--cli-green)', caretColor: 'var(--cli-green)' }"
          placeholder="Type a command or /..."
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          @keydown.enter.prevent="handleEnter"
          @keydown.up.prevent="handleUp"
          @keydown.down.prevent="handleDown"
          @keydown.tab.prevent="handleTab"
          @keydown.escape="closePalette"
          @keydown.ctrl.c.prevent="cancelInput"
        />
        <!-- Send button (mobile) -->
        <button
          class="sm:hidden flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer"
          :class="canSend ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-600'"
          :disabled="!canSend"
          @click="handleEnter"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const { output, commandHistory, historyIndex, isLoading, currentTheme, init, execute, getAutocomplete } = useTerminal()

const currentInput = ref('')
const inputEl = ref(null)
const terminalOutput = ref(null)
const selectedPaletteIndex = ref(0)

const isSending = ref(false)
const suggestedCmds = ['whoami', 'projects', 'skills', 'fun', 'theme', 'clear']

const canSend = computed(() => {
  if (isSending.value) return false
  if (showCommandPalette.value && filteredCommands.value.length > 0) return true
  return currentInput.value.trim().length > 0
})

const themeColors = {
  dark:    { bg: '#0a0a0f', surface: '#13131a', text: '#e2e8f0', green: '#4ade80' },
  hacker:  { bg: '#0a0f0a', surface: '#0f1a0f', text: '#00ff41', green: '#00ff41' },
  ocean:   { bg: '#0a0f1a', surface: '#0f1a2e', text: '#7dd3fc', green: '#38bdf8' },
  sunset:  { bg: '#1a0a0f', surface: '#2e0f1a', text: '#fda4af', green: '#fb7185' },
  purple:  { bg: '#0f0a1a', surface: '#1a0f2e', text: '#c4b5fd', green: '#a78bfa' },
}

const terminalStyle = computed(() => {
  const t = themeColors[currentTheme.value] || themeColors.dark
  return {
    '--cli-bg': t.bg,
    '--cli-surface': t.surface,
    '--cli-text': t.text,
    '--cli-green': t.green,
    background: t.bg,
    color: t.text,
  }
})

const allCommands = [
  { name: 'whoami', icon: '👤', desc: 'Who is YapoeY?' },
  { name: 'resume', icon: '📄', desc: 'Career experience' },
  { name: 'education', icon: '🎓', desc: 'Academic background' },
  { name: 'projects', icon: '🚀', desc: 'Portfolio & work' },
  { name: 'skills', icon: '⚡', desc: 'Tech stack' },
  { name: 'languages', icon: '🗣️', desc: 'Human languages' },
  { name: 'contact', icon: '📧', desc: 'How to reach me' },
  { name: 'social', icon: '🔗', desc: 'Social media links' },
  { name: 'stats', icon: '📊', desc: 'Quick numbers' },
  { name: 'fun', icon: '🎲', desc: 'Random fun fact' },
  { name: 'neofetch', icon: '💻', desc: 'System info (dev style)' },
  { name: 'blog', icon: '📝', desc: 'Blog & content' },
  { name: 'ask', icon: '🤖', desc: 'Ask AI anything' },
  { name: 'theme', icon: '🎨', desc: 'Change terminal theme' },
  { name: 'help', icon: '❓', desc: 'All available commands' },
  { name: 'clear', icon: '🧹', desc: 'Clear terminal' },
  { name: 'gui', icon: '🖥️', desc: 'Switch to GUI mode' },
  { name: 'history', icon: '📜', desc: 'Command history' },
  { name: 'exit', icon: '🚪', desc: 'Back to entry page' },
]

const showCommandPalette = computed(() => {
  const val = currentInput.value.trim()
  if (!val) return false
  // Show palette for / prefix or any partial command match
  if (val === '/') return true
  if (val.startsWith('/')) return true
  // Show autocomplete when typing a partial command (not a full sentence)
  if (!val.includes(' ') && val.length >= 1) {
    const search = val.toLowerCase()
    return allCommands.some(c => c.name.startsWith(search) && c.name !== search)
  }
  return false
})

const filteredCommands = computed(() => {
  const val = currentInput.value.trim()
  if (val === '/') return allCommands
  const search = val.startsWith('/') ? val.slice(1).toLowerCase() : val.toLowerCase()
  return allCommands.filter(c =>
    c.name.includes(search) || c.desc.toLowerCase().includes(search)
  )
})

// Reset selection when filter changes
watch(filteredCommands, () => {
  selectedPaletteIndex.value = 0
})

function lineClass(type) {
  switch (type) {
    case 'command': return 'text-green-400'
    case 'info': return 'text-gray-300'
    case 'error': return 'text-red-400'
    case 'ai': return 'text-yellow-200'
    case 'ascii': return 'text-indigo-400 text-xs sm:text-sm'
    case 'highlight': return 'text-indigo-400'
    case 'success': return 'text-emerald-400'
    case 'muted': return 'text-gray-500'
    case 'suggest': return 'text-cyan-400'
    case 'loading': return 'text-yellow-400 animate-pulse'
    default: return 'text-gray-400'
  }
}

function handleEnter() {
  if (!canSend.value) return
  if (showCommandPalette.value && filteredCommands.value.length > 0) {
    pickCommand(filteredCommands.value[selectedPaletteIndex.value].name)
  } else {
    submitCommand()
  }
}

function handleUp() {
  if (showCommandPalette.value) {
    selectedPaletteIndex.value = Math.max(0, selectedPaletteIndex.value - 1)
  } else {
    historyUp()
  }
}

function handleDown() {
  if (showCommandPalette.value) {
    selectedPaletteIndex.value = Math.min(filteredCommands.value.length - 1, selectedPaletteIndex.value + 1)
  } else {
    historyDown()
  }
}

function handleTab() {
  if (showCommandPalette.value && filteredCommands.value.length > 0) {
    pickCommand(filteredCommands.value[selectedPaletteIndex.value].name)
  } else {
    autocomplete()
  }
}

function pickCommand(name) {
  currentInput.value = name
  nextTick(() => {
    inputEl.value?.focus()
    submitCommand()
  })
}

function closePalette() {
  if (showCommandPalette.value) {
    currentInput.value = ''
  }
}

async function submitCommand() {
  if (isSending.value) return
  const cmd = currentInput.value
  if (!cmd.trim()) return
  currentInput.value = ''
  isSending.value = true
  try {
    await execute(cmd)
  } finally {
    isSending.value = false
  }
  scrollToBottom()
}

function historyUp() {
  if (commandHistory.value.length === 0) return
  if (historyIndex.value < commandHistory.value.length - 1) {
    historyIndex.value++
    currentInput.value = commandHistory.value[historyIndex.value]
  }
}

function historyDown() {
  if (historyIndex.value > 0) {
    historyIndex.value--
    currentInput.value = commandHistory.value[historyIndex.value]
  } else {
    historyIndex.value = -1
    currentInput.value = ''
  }
}

function autocomplete() {
  const match = getAutocomplete(currentInput.value)
  if (match) currentInput.value = match
}

function cancelInput() {
  currentInput.value = ''
}

function focusInput() {
  inputEl.value?.focus()
}

function exitTerminal() {
  localStorage.removeItem('yapoey_mode')
  navigateTo('/')
}

function runSuggested(cmd) {
  currentInput.value = cmd
  submitCommand()
}

function scrollToBottom() {
  nextTick(() => {
    if (terminalOutput.value) {
      terminalOutput.value.scrollTop = terminalOutput.value.scrollHeight
    }
  })
}

onMounted(() => {
  init()
  focusInput()
})

watch(() => output.value.length, () => scrollToBottom())
</script>
