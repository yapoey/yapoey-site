<template>
  <section id="works">
    <div class="section-wrapper">
      <div class="text-center mb-16">
        <span class="section-label reveal">{{ $t('WorkArea.portfolio') }}</span>
        <h2 class="section-title reveal reveal-delay-1">{{ $t('WorkArea.myProject') }}</h2>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-3 mb-12 reveal reveal-delay-2">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="px-5 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer"
          :class="activeFilter === filter.value
            ? 'bg-primary text-white shadow-lg shadow-primary/25'
            : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'"
          @click="setFilter(filter.value)"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        <div
          v-for="(project, i) in filteredProjects"
          :key="project.slug"
          class="group glass-hover overflow-hidden cursor-pointer"
          @click="openProject(project)"
        >
          <!-- Image or placeholder -->
          <div class="relative overflow-hidden aspect-video">
            <img
              v-if="project.img"
              :src="'/assets/img/projects/' + project.img"
              :alt="project.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/10 transition-all duration-500"
            >
              <span class="text-5xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">{{ project.name.charAt(0) }}</span>
            </div>
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div class="absolute bottom-4 end-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="p-5">
            <h4 class="font-semibold group-hover:text-primary transition-colors">{{ project.name }}</h4>
            <p class="text-xs text-[var(--color-text-muted)] mt-1">{{ project.company }}</p>
            <div class="flex flex-wrap gap-1.5 mt-3">
              <span class="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{{ project.type }}</span>
              <span
                v-for="t in project.tech.slice(0, 3)"
                :key="t"
                class="text-xs text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2.5 py-0.5 rounded-full"
              >{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <ProjectModal
      :project="selectedProject"
      @close="selectedProject = null"
    />
  </section>
</template>

<script setup>
const { t } = useI18n()
useReveal()
const analytics = useAnalytics()

const { projects } = useResumeData()

const activeFilter = ref('all')
const selectedProject = ref(null)

function setFilter(value) {
  if (activeFilter.value !== value) {
    analytics.worksFilter(value)
  }
  activeFilter.value = value
}

function openProject(project) {
  selectedProject.value = project
  analytics.projectView(project.name, project.type, project.company)
}

const filters = computed(() => [
  { label: t('Filters.all'), value: 'all' },
  { label: t('Filters.frontend'), value: 'Frontend' },
  { label: t('Filters.fullStack'), value: 'Full Stack' },
  { label: t('Filters.creative'), value: 'Creative' },
])

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter((p) => p.type === activeFilter.value)
})

// Listen for Escape key from modal
onMounted(() => {
  document.addEventListener('close-project-modal', () => {
    selectedProject.value = null
  })
})
</script>
