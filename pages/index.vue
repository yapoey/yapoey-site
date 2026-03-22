<template>
  <div class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0a0f]">
    <!-- Background effects -->
    <div class="absolute inset-0">
      <div class="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <div class="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-pulse" style="animation-delay: 1s" />
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center px-6">
      <!-- Typewriter name -->
      <div class="mb-3">
        <span class="text-sm font-mono text-primary/60 tracking-widest uppercase">{{ $t('IntroPage.welcome') }}</span>
      </div>

      <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
        {{ $t('IntroPage.hiIm') }}<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{{ displayName }}</span><span class="animate-blink text-primary">|</span>
      </h1>

      <p class="text-lg sm:text-xl text-gray-400 mb-12 opacity-0 transition-opacity duration-500" :class="{ 'opacity-100': showSubtitle }">
        {{ $t('IntroPage.subtitle') }}
      </p>

      <!-- Mode Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 translate-y-4 transition-all duration-500" :class="{ 'opacity-100 translate-y-0': showButtons }">
        <!-- CLI Button -->
        <button
          class="group relative w-56 px-8 py-4 rounded-2xl bg-[#1a1a25] border border-green-500/30 text-green-400 font-mono text-lg
                 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 cursor-pointer"
          @click="chooseMode('cli')"
        >
          <span class="text-green-500/60 me-2">&gt;</span> {{ $t('IntroPage.cliMode') }}
          <div class="absolute inset-0 rounded-2xl bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <!-- GUI Button -->
        <button
          class="group relative w-56 px-8 py-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 text-white text-lg font-medium
                 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
          @click="chooseMode('gui')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline me-2 -mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          {{ $t('IntroPage.guiMode') }}
          <div class="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      <!-- Keyboard hint -->
      <div class="mt-8 text-sm text-gray-600 font-mono opacity-0 transition-opacity duration-500 delay-700" :class="{ 'opacity-100': showHint }">
        {{ $t('IntroPage.keyboardHint') }} <kbd class="px-2 py-0.5 rounded bg-gray-800 text-gray-400 text-xs">1</kbd> {{ $t('IntroPage.cli') }}
        &nbsp;&middot;&nbsp;
        <kbd class="px-2 py-0.5 rounded bg-gray-800 text-gray-400 text-xs">2</kbd> {{ $t('IntroPage.gui') }}
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const router = useRouter()

const displayName = ref('')
const showSubtitle = ref(false)
const showButtons = ref(false)
const showHint = ref(false)

const fullName = 'YapoeY'

function chooseMode(mode) {
  localStorage.setItem('yapoey_mode', mode)
  router.push(mode === 'cli' ? '/cli' : '/gui')
}

function typewriterName() {
  let i = 0
  const interval = setInterval(() => {
    displayName.value = fullName.slice(0, i + 1)
    i++
    if (i >= fullName.length) {
      clearInterval(interval)
      setTimeout(() => { showSubtitle.value = true }, 300)
      setTimeout(() => { showButtons.value = true }, 600)
      setTimeout(() => { showHint.value = true }, 1000)
    }
  }, 100)
}

function handleKeydown(e) {
  if (e.key === '1') chooseMode('cli')
  if (e.key === '2') chooseMode('gui')
}

onMounted(() => {
  // Check returning visitor
  const savedMode = localStorage.getItem('yapoey_mode')
  if (savedMode === 'cli' || savedMode === 'gui') {
    router.push(savedMode === 'cli' ? '/cli' : '/gui')
    return
  }

  setTimeout(typewriterName, 500)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
