<template>
  <div class="bg-[var(--color-bg)] min-h-screen">
    <!-- Sticky header bar -->
    <div class="sticky top-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        <!-- Back button -->
        <NuxtLink
          to="/gui"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-all flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          <span class="hidden sm:inline">{{ $t('ResumePage.backToPortfolio') }}</span>
        </NuxtLink>

        <!-- Center title -->
        <span class="text-sm font-semibold truncate absolute left-1/2 -translate-x-1/2 pointer-events-none">
          {{ $t('ResumePage.title') }}
        </span>

        <!-- Actions -->
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <!-- Language switcher -->
          <div class="relative" ref="langDropdown">
            <button
              class="px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-all cursor-pointer"
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

          <!-- Print / Download button -->
          <NuxtLink
            to="/resume/print"
            target="_blank"
            class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-primary text-white hover:bg-primary-dark shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <span class="hidden sm:inline">{{ $t('ResumePage.printSavePdf') }}</span>
            <span class="sm:hidden">PDF</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Resume Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

      <!-- Profile Header -->
      <div class="text-center mb-12 sm:mb-14">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{{ bio.name }}</h1>
        <p class="text-lg sm:text-xl text-primary font-medium mt-3">{{ bio.title }}</p>
        <p class="text-sm sm:text-base text-[var(--color-text-muted)] mt-2">
          {{ bio.location }} · {{ $t('ResumePage.originFrom') }} {{ bio.from }}
        </p>
        <div class="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-4 text-sm text-[var(--color-text-muted)]">
          <a :href="'mailto:' + bio.email" class="hover:text-primary transition-colors">{{ bio.email }}</a>
          <span class="text-[var(--color-border)]">|</span>
          <a :href="'https://' + bio.website" target="_blank" class="hover:text-primary transition-colors">{{ bio.website }}</a>
          <span class="text-[var(--color-border)]">|</span>
          <a :href="'https://' + bio.github" target="_blank" class="hover:text-primary transition-colors">{{ bio.github }}</a>
          <span class="text-[var(--color-border)]">|</span>
          <a :href="'https://' + bio.linkedin" target="_blank" class="hover:text-primary transition-colors">{{ bio.linkedin }}</a>
        </div>
      </div>

      <!-- Summary -->
      <section class="mb-12">
        <p class="text-[var(--color-text-muted)] leading-relaxed text-center max-w-3xl mx-auto text-base">
          {{ bio.summary }}
        </p>
      </section>

      <!-- Stats -->
      <section class="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 mb-14">
        <div v-for="(value, key) in displayStats" :key="key" class="glass p-3 sm:p-4 text-center rounded-xl">
          <div class="text-xl sm:text-2xl font-bold text-primary">{{ value.val }}</div>
          <div class="text-[10px] sm:text-xs text-[var(--color-text-muted)] mt-1 uppercase tracking-wider">{{ value.label }}</div>
        </div>
      </section>

      <!-- Experience -->
      <section class="mb-14">
        <h2 class="text-xl sm:text-2xl font-bold mb-8 flex items-center gap-3">
          <span class="w-8 h-1 bg-primary rounded-full"></span>
          {{ $t('ResumePage.experience') }}
        </h2>
        <div class="space-y-10">
          <div v-for="(job, i) in experience" :key="i" class="relative ps-6 sm:ps-8 border-s-2 border-primary/20">
            <div class="absolute -start-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-[var(--color-bg)]" />
            <h3 class="text-base sm:text-lg font-semibold leading-snug">{{ job.title }}</h3>
            <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--color-text-muted)] mt-1 mb-4">
              <span class="font-medium text-[var(--color-text)]">{{ job.company }}</span>
              <span class="text-[var(--color-border)]">·</span>
              <span>{{ job.type }}</span>
              <span class="text-[var(--color-border)]">·</span>
              <span>{{ job.location }}</span>
              <span class="text-[var(--color-border)]">·</span>
              <span class="text-primary font-medium">{{ job.duration }}</span>
            </div>
            <ul class="space-y-2 mb-4">
              <li
                v-for="(h, j) in job.highlights"
                :key="j"
                class="flex gap-2.5 text-sm sm:text-base leading-relaxed"
              >
                <span class="text-primary flex-shrink-0 mt-1.5 text-xs">&#9679;</span>
                <span class="text-[var(--color-text)] opacity-80">{{ h.startsWith('→') ? h.slice(2) : h }}</span>
              </li>
            </ul>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="t in job.tech.split(', ')"
                :key="t"
                class="px-2.5 py-0.5 text-xs rounded-md bg-primary/10 text-primary font-medium"
              >{{ t }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Education -->
      <section class="mb-14">
        <h2 class="text-xl sm:text-2xl font-bold mb-8 flex items-center gap-3">
          <span class="w-8 h-1 bg-primary rounded-full"></span>
          {{ $t('ResumePage.education') }}
        </h2>
        <div class="space-y-6">
          <div v-for="(edu, i) in education" :key="i" class="relative ps-6 sm:ps-8 border-s-2 border-primary/20">
            <div class="absolute -start-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-[var(--color-bg)]" />
            <h3 class="text-base sm:text-lg font-semibold">{{ edu.degree }}</h3>
            <p class="text-sm text-[var(--color-text-muted)] mt-1">
              {{ edu.school }} · {{ edu.location }} · <span class="text-primary font-medium">{{ edu.year }}</span>
            </p>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section class="mb-14">
        <h2 class="text-xl sm:text-2xl font-bold mb-8 flex items-center gap-3">
          <span class="w-8 h-1 bg-primary rounded-full"></span>
          {{ $t('ResumePage.skills') }}
        </h2>
        <div class="grid sm:grid-cols-2 gap-8">
          <div v-for="(items, category) in skills" :key="category">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">
              {{ formatCategory(category) }}
            </h3>
            <div class="flex flex-wrap gap-2" v-if="category !== 'languages'">
              <span
                v-for="skill in items"
                :key="skill"
                class="px-3 py-1.5 text-sm rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
              >{{ skill }}</span>
            </div>
            <div class="space-y-2.5" v-else>
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
      <section class="mb-14">
        <h2 class="text-xl sm:text-2xl font-bold mb-8 flex items-center gap-3">
          <span class="w-8 h-1 bg-primary rounded-full"></span>
          {{ $t('ResumePage.countriesVisited') }} ({{ countries.length }}+)
        </h2>
        <div class="flex flex-wrap gap-2.5">
          <div
            v-for="country in countries"
            :key="country.name"
            class="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-sm"
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

const { t: $t, locale, setLocale } = useI18n()

useHead({ title: 'YapoeY | Resume' })
useSeoMeta({
  description: 'Mohamed Ibrahim (YapoeY) | Resume. 6+ years experience in full stack development, product management, and technical leadership.',
  ogTitle: 'YapoeY | Resume',
  ogDescription: 'Full Stack Developer resume. Vue.js, React, Node.js, TypeScript. Based in Seoul, Korea.',
  ogUrl: 'https://yapoey.com/resume',
  twitterTitle: 'YapoeY | Resume',
  twitterDescription: 'Full Stack Developer resume. Vue.js, React, Node.js, TypeScript. Based in Seoul, Korea.',
})

const themeStore = useThemeStore()
const { bio, experience, education, skills, countries, stats } = useResumeData()

const showLangMenu = ref(false)
const langDropdown = ref(null)

const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' },
  { code: 'ar', name: 'العربية' },
]

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
  years: { val: `${stats.yearsExp}+`, label: $t('ResumePage.yearsExp') },
  projects: { val: stats.projects, label: $t('ResumePage.projects') },
  countries: { val: stats.countriesVisited, label: $t('ResumePage.countries') },
  commits: { val: stats.commits, label: $t('ResumePage.commits') },
  companies: { val: stats.companies, label: $t('ResumePage.companies') },
  degrees: { val: stats.degrees, label: $t('ResumePage.degrees') },
}))

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
