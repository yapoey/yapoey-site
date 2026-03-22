<template>
  <section id="works" class="bg-[var(--color-bg)]">
    <div class="section-wrapper">
      <h2 class="section-title mb-10">{{ $t('WorkArea.myProject') }}</h2>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap gap-3 mb-10">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer"
          :class="activeFilter === filter.value
            ? 'bg-primary text-white'
            : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          v-for="(project, i) in filteredProjects"
          :key="i"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group glass rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          <div class="relative overflow-hidden">
            <img
              :src="'/assets/img/works/portfolio/' + project.img"
              :alt="project.name"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
          </div>
          <div class="p-4">
            <h4 class="font-semibold">{{ project.name }}</h4>
            <span class="text-sm text-primary">{{ project.type }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t, tm } = useI18n()

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
