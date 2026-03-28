<template>
  <div class="bg-[var(--color-bg)] min-h-screen">
    <!-- Header bar -->
    <div class="sticky top-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
        <!-- Back + Title -->
        <div class="flex items-center gap-3 min-w-0">
          <NuxtLink to="/gui" class="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
          <span class="text-sm font-semibold truncate">{{ $t('ResumePage.title') || 'Resume' }}</span>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <!-- Language switcher -->
          <div class="relative" ref="langDropdown">
            <button
              class="px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
              @click="showLangMenu = !showLangMenu"
            >
              {{ currentLocaleCode }}
            </button>
            <div
              v-show="showLangMenu"
              class="absolute end-0 mt-2 w-32 glass rounded-lg shadow-lg py-1 z-50"
            >
              <button
                v-for="loc in availableLocales"
                :key="loc.code"
                class="block w-full text-start px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
                @click="switchLocale(loc.code)"
              >
                {{ loc.name }}
              </button>
            </div>
          </div>

          <!-- Dark mode toggle -->
          <button
            class="p-1.5 sm:p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
            aria-label="Toggle dark mode"
            @click="themeStore.toggleColorMode()"
          >
            <svg v-if="themeStore.isDark" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>

          <!-- Print button -->
          <NuxtLink
            to="/resume/print"
            target="_blank"
            class="btn-primary text-xs sm:text-sm !px-3 sm:!px-5 !py-1.5 sm:!py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd" />
            </svg>
            <span class="hidden sm:inline">{{ $t('ResumePage.printSavePdf') }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Resume Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      <!-- Header -->
      <div class="text-center mb-10 sm:mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold">{{ bio.name }}</h1>
        <p class="text-lg sm:text-xl text-primary mt-2">{{ bio.title }}</p>
        <p class="text-sm sm:text-base text-[var(--color-text-muted)] mt-2">{{ bio.location }} · Originally from {{ bio.from }}</p>
        <div class="flex flex-wrap justify-center gap-4 mt-4 text-sm text-[var(--color-text-muted)]">
          <span>{{ bio.email }}</span>
          <span>·</span>
          <span>{{ bio.website }}</span>
          <span>·</span>
          <span>{{ bio.github }}</span>
          <span>·</span>
          <span>{{ bio.linkedin }}</span>
        </div>
      </div>

      <!-- Summary -->
      <section class="mb-10">
        <p class="text-[var(--color-text-muted)] leading-relaxed text-center max-w-3xl mx-auto">
          {{ bio.summary }}
        </p>
      </section>

      <!-- Stats -->
      <section class="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-12">
        <div v-for="(value, key) in displayStats" :key="key" class="glass p-4 text-center">
          <div class="text-xl font-bold text-primary">{{ value.val }}</div>
          <div class="text-xs text-[var(--color-text-muted)] mt-1">{{ value.label }}</div>
        </div>
      </section>

      <!-- Experience -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
          <span class="w-8 h-1 bg-primary rounded-full"></span>
          {{ $t('ResumePage.experience') }}
        </h2>
        <div class="space-y-8">
          <div v-for="(job, i) in experience" :key="i" class="relative ps-6 border-s-2 border-primary/20">
            <div class="absolute -start-[5px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-[var(--color-bg)]" />
            <div class="flex flex-wrap items-baseline gap-2 mb-1">
              <h3 class="text-lg font-semibold">{{ job.title }}</h3>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-muted)] mb-3">
              <span class="font-medium text-[var(--color-text)]">{{ job.company }}</span>
              <span>·</span>
              <span>{{ job.type }}</span>
              <span>·</span>
              <span>{{ job.location }}</span>
              <span>·</span>
              <span class="text-primary font-medium">{{ job.duration }}</span>
            </div>
            <ul class="space-y-1.5 text-sm text-[var(--color-text-muted)]">
              <li v-for="(h, j) in job.highlights" :key="j" class="flex gap-2">
                <span v-if="h.startsWith('→')" class="text-primary flex-shrink-0">→</span>
                <span v-else class="text-primary/60 flex-shrink-0">▸</span>
                <span>{{ h.startsWith('→') ? h.slice(2) : h }}</span>
              </li>
            </ul>
            <div class="flex flex-wrap gap-1.5 mt-3">
              <span
                v-for="t in job.tech.split(', ')"
                :key="t"
                class="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary"
              >{{ t }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Education -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
          <span class="w-8 h-1 bg-primary rounded-full"></span>
          {{ $t('ResumePage.education') }}
        </h2>
        <div class="space-y-6">
          <div v-for="(edu, i) in education" :key="i" class="relative ps-6 border-s-2 border-primary/20">
            <div class="absolute -start-[5px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-[var(--color-bg)]" />
            <h3 class="text-lg font-semibold">{{ edu.degree }}</h3>
            <p class="text-sm text-[var(--color-text-muted)]">
              {{ edu.school }} · {{ edu.location }} · <span class="text-primary">{{ edu.year }}</span>
            </p>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
          <span class="w-8 h-1 bg-primary rounded-full"></span>
          {{ $t('ResumePage.skills') }}
        </h2>
        <div class="grid sm:grid-cols-2 gap-6">
          <div v-for="(items, category) in skills" :key="category">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
              {{ formatCategory(category) }}
            </h3>
            <div class="flex flex-wrap gap-2" v-if="category !== 'languages'">
              <span
                v-for="skill in items"
                :key="skill"
                class="px-3 py-1.5 text-sm rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
              >{{ skill }}</span>
            </div>
            <div class="space-y-2" v-else>
              <div v-for="lang in items" :key="lang.name" class="flex items-center gap-3">
                <span class="text-lg">{{ lang.flag }}</span>
                <span class="font-medium">{{ lang.name }}</span>
                <span class="text-sm text-[var(--color-text-muted)]">{{ lang.level }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Countries -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
          <span class="w-8 h-1 bg-primary rounded-full"></span>
          {{ $t('ResumePage.countriesVisited') }} ({{ countries.length }}+)
        </h2>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="country in countries"
            :key="country.name"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm"
          >
            <span class="text-lg">{{ country.flag }}</span>
            <span>{{ country.name }}</span>
            <span v-if="country.note" class="text-xs text-[var(--color-text-muted)]">· {{ country.note }}</span>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const { locale, setLocale } = useI18n()
const themeStore = useThemeStore()
const { bio, experience, education, skills, countries, stats } = useResumeData()

const showLangMenu = ref(false)
const langDropdown = ref(null)

const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' },
  { code: 'ar', name: 'العربية' },
]

const currentLocaleName = computed(() => {
  return availableLocales.find(l => l.code === locale.value)?.name || 'English'
})

const currentLocaleCode = computed(() => locale.value.toUpperCase())

async function switchLocale(code) {
  await setLocale(code)
  showLangMenu.value = false
}

function handleClickOutside(e) {
  if (langDropdown.value && !langDropdown.value.contains(e.target)) {
    showLangMenu.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const displayStats = computed(() => ({
  years: { val: `${stats.yearsExp}+`, label: 'Years Exp' },
  projects: { val: stats.projects, label: 'Projects' },
  countries: { val: stats.countriesVisited, label: 'Countries' },
  commits: { val: stats.commits, label: 'Commits' },
  companies: { val: stats.companies, label: 'Companies' },
  degrees: { val: stats.degrees, label: 'Degrees' },
}))

const { t: $t } = useI18n()

function formatCategory(key) {
  const map = {
    frontend: $t('ResumeArea.frontend'),
    backend: $t('ResumeArea.backend'),
    database: $t('ResumeArea.database'),
    cloud: $t('ResumeArea.cloudDevops'),
    tools: $t('ResumeArea.toolsTesting'),
    languages: $t('ResumeArea.languages'),
  }
  return map[key] || key
}
</script>
