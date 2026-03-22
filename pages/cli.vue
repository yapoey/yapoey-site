<template>
  <div class="min-h-screen bg-[#0a0a0f] flex flex-col font-mono text-sm">
    <!-- Top bar -->
    <div class="flex items-center justify-between px-4 py-2 bg-[#13131a] border-b border-gray-800">
      <span class="text-gray-500 text-xs">yapoey.com — terminal v1.0</span>
      <div class="flex items-center gap-3">
        <NuxtLink to="/gui" class="text-xs text-gray-500 hover:text-primary transition-colors">
          Switch to GUI
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
    <div class="flex flex-wrap gap-2 px-4 py-3 bg-[#13131a] border-b border-gray-800 md:hidden">
      <button
        v-for="cmd in suggestedCmds"
        :key="cmd"
        class="px-3 py-1.5 text-xs rounded-lg bg-[#1a1a25] text-green-400 border border-gray-700 hover:border-green-500 transition-colors cursor-pointer"
        @click="runSuggested(cmd)"
      >
        {{ cmd }}
      </button>
    </div>

    <!-- Terminal output -->
    <div
      ref="terminalOutput"
      class="flex-1 overflow-y-auto px-4 py-4 space-y-0.5"
      @click="focusInput"
    >
      <div
        v-for="line in output"
        :key="line.id"
        class="whitespace-pre-wrap break-words leading-relaxed"
        :class="lineClass(line.type)"
      >{{ line.text }}</div>

      <!-- Loading indicator -->
      <div v-if="isLoading" class="text-yellow-400 animate-pulse">
        Thinking...
      </div>
    </div>

    <!-- Input -->
    <div class="px-4 py-3 bg-[#13131a] border-t border-gray-800">
      <div class="flex items-center gap-2">
        <span class="text-green-500 flex-shrink-0">yapoey@terminal:~$</span>
        <input
          ref="inputEl"
          v-model="currentInput"
          type="text"
          class="flex-1 bg-transparent text-green-300 outline-none caret-green-400 placeholder-gray-600"
          placeholder="Type a command..."
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          @keydown.enter="submitCommand"
          @keydown.up.prevent="historyUp"
          @keydown.down.prevent="historyDown"
          @keydown.tab.prevent="autocomplete"
          @keydown.ctrl.c.prevent="cancelInput"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const { output, commandHistory, historyIndex, isLoading, init, execute, getAutocomplete } = useTerminal()

const currentInput = ref('')
const inputEl = ref(null)
const terminalOutput = ref(null)

const suggestedCmds = ['help', 'about', 'projects', 'skills', 'contact']

function lineClass(type) {
  switch (type) {
    case 'command': return 'text-green-400'
    case 'info': return 'text-gray-300'
    case 'error': return 'text-red-400'
    case 'ai': return 'text-yellow-200'
    case 'ascii': return 'text-primary text-xs sm:text-sm'
    case 'loading': return 'text-yellow-400 animate-pulse'
    default: return 'text-gray-400'
  }
}

async function submitCommand() {
  const cmd = currentInput.value
  currentInput.value = ''
  await execute(cmd)
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

// Watch output changes to auto-scroll
watch(() => output.value.length, () => scrollToBottom())
</script>
