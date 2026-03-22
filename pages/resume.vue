<template>
  <div class="bg-[var(--color-bg)] min-h-screen">
    <!-- Header bar -->
    <div class="sticky top-0 z-50 bg-[var(--color-bg)] bg-opacity-90 backdrop-blur-md border-b border-[var(--color-border)]">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/gui" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
          ← Back to Portfolio
        </NuxtLink>
        <div class="flex items-center gap-3">
          <a
            href="/assets/resume/YapoeY.en.pdf"
            class="btn-primary text-sm !px-5 !py-2"
            download
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Download PDF
          </a>
        </div>
      </div>
    </div>

    <!-- Resume Content -->
    <div class="max-w-4xl mx-auto px-6 py-12">

      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold">{{ bio.name }}</h1>
        <p class="text-xl text-primary mt-2">{{ bio.title }}</p>
        <p class="text-[var(--color-text-muted)] mt-2">{{ bio.location }} · Originally from {{ bio.from }}</p>
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
          Experience
        </h2>
        <div class="space-y-8">
          <div v-for="(job, i) in experience" :key="i" class="relative pl-6 border-l-2 border-primary/20">
            <div class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-[var(--color-bg)]" />
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
          Education
        </h2>
        <div class="space-y-6">
          <div v-for="(edu, i) in education" :key="i" class="relative pl-6 border-l-2 border-primary/20">
            <div class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-[var(--color-bg)]" />
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
          Skills
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
                <span class="text-sm text-[var(--color-text-muted)]">— {{ lang.level }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Countries -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
          <span class="w-8 h-1 bg-primary rounded-full"></span>
          Countries Visited ({{ countries.length }}+)
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

const { bio, experience, education, skills, countries, stats } = useResumeData()

const displayStats = computed(() => ({
  years: { val: `${stats.yearsExp}+`, label: 'Years Exp' },
  projects: { val: stats.projects, label: 'Projects' },
  countries: { val: stats.countriesVisited, label: 'Countries' },
  commits: { val: stats.commits, label: 'Commits' },
  companies: { val: stats.companies, label: 'Companies' },
  degrees: { val: stats.degrees, label: 'Degrees' },
}))

function formatCategory(key) {
  const map = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    cloud: 'Cloud & DevOps',
    tools: 'Tools',
    languages: 'Languages',
  }
  return map[key] || key
}
</script>
