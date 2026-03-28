<template>
  <section id="resume" class="bg-[var(--color-bg-2)]">
    <div class="section-wrapper">
      <div class="text-center mb-16">
        <span class="section-label reveal">{{ $t('ResumeArea.resume') }}</span>
        <h2 class="section-title reveal reveal-delay-1">{{ $t('ResumeArea.educationExperience') }}</h2>
      </div>

      <div class="flex justify-center gap-2 mb-12 reveal reveal-delay-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer"
          :class="activeTab === tab.key
            ? 'bg-primary text-white shadow-lg shadow-primary/25'
            : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'"
          @click="activeTab = tab.key"
        >
          {{ $t(tab.label) }}
        </button>
      </div>

      <div v-show="activeTab === 'education'" class="max-w-3xl mx-auto">
        <div class="relative ps-8 border-s-2 border-primary/20 space-y-8">
          <div v-for="(item, i) in educations" :key="i" class="relative reveal">
            <div class="absolute -start-[calc(2rem+5px)] w-3 h-3 rounded-full bg-primary ring-4 ring-[var(--color-bg-2)]" />
            <div class="glass p-6">
              <span class="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{{ item.year }}</span>
              <h4 class="text-lg font-semibold mt-3">{{ item.degree }}</h4>
              <p class="text-[var(--color-text-muted)] mt-1">{{ item.school }} · {{ item.location }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'experience'" class="max-w-3xl mx-auto">
        <div class="relative ps-8 border-s-2 border-primary/20 space-y-6">
          <div v-for="(job, i) in experiences" :key="i" class="relative reveal cursor-pointer" @click="toggleExpand(i)">
            <div class="absolute -start-[calc(2rem+5px)] w-3 h-3 rounded-full bg-primary ring-4 ring-[var(--color-bg-2)]" />
            <div class="glass-hover p-6">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <span class="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{{ job.duration }}</span>
                  <h4 class="text-lg font-semibold mt-3">{{ job.title }}</h4>
                  <div class="flex flex-wrap items-center gap-2 mt-2 text-sm text-[var(--color-text-muted)]">
                    <span class="font-medium text-[var(--color-text)]">{{ job.company }}</span>
                    <span>&middot;</span>
                    <span>{{ job.type }}</span>
                    <span>&middot;</span>
                    <span>{{ job.location }}</span>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--color-text-muted)] transition-transform duration-200 flex-shrink-0 mt-2" :class="expandedJobs.has(i) ? 'rotate-180' : ''" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <div v-show="expandedJobs.has(i)" class="mt-4 pt-4 border-t border-[var(--color-border)] text-sm leading-relaxed">
                <ul class="space-y-1.5">
                  <li v-for="(h, j) in job.highlights" :key="j" class="flex gap-2 text-[var(--color-text)] opacity-80">
                    <span v-if="h.startsWith('→')" class="text-primary flex-shrink-0">→</span>
                    <span v-else class="text-primary/60 flex-shrink-0">▸</span>
                    <span>{{ h.startsWith('→') ? h.slice(2) : h }}</span>
                  </li>
                </ul>
                <div class="flex flex-wrap gap-1.5 mt-3">
                  <span v-for="t in job.tech.split(', ')" :key="t" class="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'skills'">
        <div class="max-w-4xl mx-auto space-y-10">
          <div
            v-for="(category, i) in skillCategories"
            :key="category.name"
            class="reveal"
            :class="i > 0 ? 'reveal-delay-' + Math.min(i, 4) : ''"
          >
            <h3 class="text-lg font-semibold mb-4">{{ category.label }}</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in category.items"
                :key="skill"
                class="px-4 py-2 text-sm rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-200"
              >{{ skill }}</span>
            </div>
          </div>

          <!-- Languages -->
          <div class="reveal reveal-delay-4">
            <h3 class="text-lg font-semibold mb-4">{{ $t('ResumeArea.languages') }}</h3>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="lang in skills.languages"
                :key="lang.name"
                class="flex items-center gap-3 px-5 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                <span class="text-2xl">{{ lang.flag }}</span>
                <div>
                  <div class="font-medium">{{ lang.name }}</div>
                  <div class="text-xs text-[var(--color-text-muted)]">{{ lang.level }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
useReveal()

const { education: educations, experience: experiences, skills } = useResumeData()

const { t } = useI18n()

const skillCategories = computed(() => [
  { name: 'frontend', label: t('ResumeArea.frontend'), items: skills.frontend },
  { name: 'backend', label: t('ResumeArea.backend'), items: skills.backend },
  { name: 'database', label: t('ResumeArea.database'), items: skills.database },
  { name: 'cloud', label: t('ResumeArea.cloudDevops'), items: skills.cloud },
  { name: 'tools', label: t('ResumeArea.toolsTesting'), items: skills.tools },
])

const activeTab = ref('education')
const expandedJobs = ref(new Set())

const tabs = [
  { key: 'education', label: 'ResumeArea.Education' },
  { key: 'experience', label: 'ResumeArea.Experience' },
  { key: 'skills', label: 'ResumeArea.Skills' },
]

function toggleExpand(i) {
  const s = new Set(expandedJobs.value)
  if (s.has(i)) s.delete(i)
  else s.add(i)
  expandedJobs.value = s
}

</script>
