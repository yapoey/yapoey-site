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
              <p class="text-[var(--color-text-muted)] mt-1">{{ item.name }}</p>
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
                    <span>{{ job.employmentType }}</span>
                    <span>&middot;</span>
                    <span>{{ job.country }}</span>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--color-text-muted)] transition-transform duration-200 flex-shrink-0 mt-2" :class="expandedJobs.has(i) ? 'rotate-180' : ''" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <div v-show="expandedJobs.has(i)" class="mt-4 pt-4 border-t border-[var(--color-border)] text-sm text-[var(--color-text-muted)] whitespace-pre-line leading-relaxed">
                {{ job.des }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'skills'">
        <div class="max-w-4xl mx-auto space-y-12">
          <div class="reveal">
            <h3 class="text-lg font-semibold mb-6">{{ $t('ResumeArea.WebDevelop') }}</h3>
            <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-5">
              <div v-for="icon in webDevelopmentIcons" :key="icon.id" class="flex flex-col items-center text-center gap-2 group">
                <div class="w-16 h-16 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-200">
                  <img v-if="icon.url" :src="'/assets/img/works/webdevelop/' + icon.url" :alt="icon.name" class="w-8 h-8 object-contain" />
                </div>
                <span class="text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">{{ icon.name }}</span>
              </div>
            </div>
          </div>

          <div class="reveal reveal-delay-1">
            <h3 class="text-lg font-semibold mb-6">{{ $t('ResumeArea.WebHosting') }}</h3>
            <div class="grid grid-cols-4 sm:grid-cols-6 gap-5">
              <div v-for="icon in hostingManagement" :key="icon.id" class="flex flex-col items-center text-center gap-2 group">
                <div class="w-16 h-16 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-200">
                  <img v-if="icon.url" :src="'/assets/img/works/management/' + icon.url" :alt="icon.name" class="w-8 h-8 object-contain" />
                </div>
                <span class="text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">{{ icon.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm } = useI18n()
useReveal()

const activeTab = ref('education')
const expandedJobs = ref(new Set())

const tabs = [
  { key: 'education', label: 'ResumeArea.Education' },
  { key: 'experience', label: 'ResumeArea.Experience' },
  { key: 'skills', label: 'ResumeArea.Skills' },
]

const educations = computed(() => tm('ResumeArea.educations'))
const experiences = computed(() => tm('ResumeArea.experiences'))

function toggleExpand(i) {
  const s = new Set(expandedJobs.value)
  if (s.has(i)) s.delete(i)
  else s.add(i)
  expandedJobs.value = s
}

const webDevelopmentIcons = [
  { id: 1, url: 'bootstrap.png', name: 'Bootstrap' },
  { id: 2, url: 'css3.png', name: 'CSS' },
  { id: 3, url: 'html5.png', name: 'HTML' },
  { id: 4, url: 'javascript.png', name: 'Javascript' },
  { id: 5, url: 'jquery.png', name: 'jQuery' },
  { id: 6, url: 'laravel.png', name: 'Laravel' },
  { id: 7, url: 'nodejs.png', name: 'Express.js' },
  { id: 8, url: 'vue.png', name: 'Vue.js' },
  { id: 9, url: 'sass.png', name: 'SASS' },
  { id: 10, url: 'php.png', name: 'PHP' },
  { id: 11, url: 'webpack.png', name: 'Webpack' },
]

const hostingManagement = [
  { id: 1, url: 'aws.png', name: 'AWS' },
  { id: 2, url: 'googleCloud.png', name: 'Google Cloud' },
  { id: 3, url: 'docker.png', name: 'Docker' },
  { id: 4, url: 'github.png', name: 'GitHub' },
  { id: 5, url: 'bitbucket.png', name: 'Bitbucket' },
  { id: 6, url: 'jira.png', name: 'Jira' },
]
</script>
