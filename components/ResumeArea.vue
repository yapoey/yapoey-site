<template>
  <section id="resume" class="bg-[var(--color-bg-2)]">
    <div class="section-wrapper">
      <h2 class="section-title mb-12">{{ $t('ResumeArea.resume') }}</h2>

      <!-- Tabs -->
      <div class="flex gap-4 mb-10 border-b border-[var(--color-border)]">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="pb-3 px-2 text-sm font-medium transition-colors relative cursor-pointer"
          :class="activeTab === tab.key
            ? 'text-primary border-b-2 border-primary'
            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'"
          @click="activeTab = tab.key"
        >
          {{ $t(tab.label) }}
        </button>
      </div>

      <!-- Education -->
      <div v-show="activeTab === 'education'">
        <div class="space-y-6">
          <div
            v-for="(item, i) in educations"
            :key="i"
            class="glass p-6 rounded-xl"
          >
            <span class="text-sm text-primary font-medium">{{ item.year }}</span>
            <h4 class="text-lg font-semibold mt-1">{{ item.degree }}</h4>
            <span class="text-[var(--color-text-muted)]">{{ item.name }}</span>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div v-show="activeTab === 'experience'">
        <div class="space-y-6">
          <div
            v-for="(job, i) in experiences"
            :key="i"
            class="glass p-6 rounded-xl cursor-pointer"
            @click="toggleExpand(i)"
          >
            <div class="flex items-start justify-between">
              <div>
                <span class="text-sm text-primary font-medium">{{ job.duration }}</span>
                <h4 class="text-lg font-semibold mt-1">{{ job.title }}</h4>
                <div class="flex flex-wrap gap-2 mt-1">
                  <span class="text-sm text-[var(--color-text-muted)]">{{ job.company }}</span>
                  <span class="text-sm text-[var(--color-text-muted)]">&middot;</span>
                  <span class="text-sm text-[var(--color-text-muted)]">{{ job.employmentType }}</span>
                  <span class="text-sm text-[var(--color-text-muted)]">&middot;</span>
                  <span class="text-sm text-[var(--color-text-muted)]">{{ job.country }}</span>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-[var(--color-text-muted)] transition-transform duration-200 flex-shrink-0 mt-1"
                :class="expandedJobs.has(i) ? 'rotate-180' : ''"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <div v-show="expandedJobs.has(i)" class="mt-4 text-sm text-[var(--color-text-muted)] whitespace-pre-line leading-relaxed">
              {{ job.des }}
            </div>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div v-show="activeTab === 'skills'">
        <!-- Web Development -->
        <div class="mb-10">
          <h3 class="text-lg font-semibold mb-6">{{ $t('ResumeArea.WebDevelop') }}</h3>
          <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6">
            <div
              v-for="icon in webDevelopmentIcons"
              :key="icon.id"
              class="flex flex-col items-center text-center gap-2"
            >
              <img
                v-if="icon.url"
                :src="'/assets/img/works/webdevelop/' + icon.url"
                :alt="icon.name"
                class="w-12 h-12 object-contain"
              />
              <span class="text-xs text-[var(--color-text-muted)]">{{ icon.name }}</span>
            </div>
          </div>
        </div>

        <!-- Hosting & Management -->
        <div>
          <h3 class="text-lg font-semibold mb-6">{{ $t('ResumeArea.WebHosting') }}</h3>
          <div class="grid grid-cols-4 sm:grid-cols-6 gap-6">
            <div
              v-for="icon in hostingManagement"
              :key="icon.id"
              class="flex flex-col items-center text-center gap-2"
            >
              <img
                v-if="icon.url"
                :src="'/assets/img/works/management/' + icon.url"
                :alt="icon.name"
                class="w-12 h-12 object-contain"
              />
              <span class="text-xs text-[var(--color-text-muted)]">{{ icon.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm } = useI18n()

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
