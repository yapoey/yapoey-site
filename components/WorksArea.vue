<template>
  <section id="works">
    <div class="section-wrapper">
      <div class="text-center mb-16">
        <span class="section-label reveal">Portfolio</span>
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
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        <a
          v-for="(project, i) in filteredProjects"
          :key="i"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group glass-hover overflow-hidden reveal"
        >
          <!-- Image -->
          <div class="relative overflow-hidden aspect-video">
            <img
              :src="'/assets/img/works/portfolio/' + project.img"
              :alt="project.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <!-- Hover overlay with arrow -->
            <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <!-- Info -->
          <div class="p-5">
            <h4 class="font-semibold group-hover:text-primary transition-colors">{{ project.name }}</h4>
            <span class="inline-block mt-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{{ project.type }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t, tm } = useI18n()
useReveal()

const activeFilter = ref('all')

const filters = computed(() => [
  { label: 'All', value: 'all' },
  { label: t('Common.frontend'), value: t('Common.frontend') },
  { label: t('Common.fullStack'), value: t('Common.fullStack') },
  { label: t('Common.practicing'), value: t('Common.practicing') },
])

const projects = computed(() => tm('WorkArea.projects'))

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects.value
  return projects.value.filter((p) => p.type === activeFilter.value)
})
</script>
