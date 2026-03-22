<template>
  <section class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-bg-2)] to-[var(--color-bg)]" />
    <div class="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
    <div class="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

    <div class="section-wrapper relative z-10 w-full">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Text Content -->
        <div>
          <span class="section-label reveal">{{ $t('HeroArea.hey') }}</span>

          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mt-2 mb-6 reveal reveal-delay-1">
            {{ $t('HeroArea.YapoeY') }}
          </h1>

          <p class="text-xl text-[var(--color-text-muted)] mb-4 reveal reveal-delay-2">
            {{ $t('HeroArea.motto') }}
          </p>

          <div class="text-xl text-[var(--color-text-muted)] mb-8 h-8 reveal reveal-delay-2">
            {{ $t('HeroArea.Iam') }}
            <span class="text-primary font-semibold">{{ currentText }}<span class="animate-blink">|</span></span>
          </div>

          <!-- Stats bar -->
          <div class="flex flex-wrap gap-6 mb-10 reveal reveal-delay-3">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="text-2xl font-bold text-primary">{{ stat.value }}</div>
              <div class="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mt-1">{{ stat.label }}</div>
            </div>
          </div>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-4 reveal reveal-delay-4">
            <a href="#works" class="btn-primary" @click.prevent="smoothScroll('#works')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
              View Work
            </a>
            <a :href="$t('doc.pdf')" class="btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              {{ $t('HeroArea.shortCv') }}
            </a>
          </div>
        </div>

        <!-- Right: Hero Image -->
        <div class="hidden lg:flex justify-center reveal reveal-delay-2">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-2xl scale-110" />
            <img
              src="/assets/img/hero/heroRight.png"
              alt="Hero"
              class="relative max-w-lg w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n()
useReveal()

const CAREER_START_YEAR = 2012

const yearsExp = computed(() => new Date().getFullYear() - CAREER_START_YEAR)

const stats = computed(() => [
  { value: `${yearsExp.value}+`, label: 'Years Exp' },
  { value: '15+', label: 'Projects' },
  { value: '32', label: 'Countries Visited' },
  { value: '3', label: 'Languages' },
])

const strings = computed(() => [
  t('HeroArea.freelancer'),
  t('HeroArea.frontend'),
  t('HeroArea.backend'),
])

const currentText = ref('')
const currentIndex = ref(0)
let timeout = null

function typeText(text, charIndex, onDone) {
  if (charIndex <= text.length) {
    currentText.value = text.slice(0, charIndex)
    timeout = setTimeout(() => typeText(text, charIndex + 1, onDone), 80)
  } else {
    timeout = setTimeout(onDone, 1500)
  }
}

function deleteText(text, charIndex, onDone) {
  if (charIndex >= 0) {
    currentText.value = text.slice(0, charIndex)
    timeout = setTimeout(() => deleteText(text, charIndex - 1, onDone), 40)
  } else {
    timeout = setTimeout(onDone, 300)
  }
}

function cycle() {
  const text = strings.value[currentIndex.value]
  typeText(text, 0, () => {
    deleteText(text, text.length, () => {
      currentIndex.value = (currentIndex.value + 1) % strings.value.length
      cycle()
    })
  })
}

function smoothScroll(href) {
  const el = document.querySelector(href)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 70
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(() => cycle())
onUnmounted(() => clearTimeout(timeout))
</script>
