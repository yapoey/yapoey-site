<template>
  <Teleport to="body">
    <div
      v-if="project"
      class="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      @click.self="$emit('close')"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')" />

      <!-- Modal -->
      <div
        class="relative z-10 w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--color-bg)] border border-[var(--color-border)] sm:rounded-2xl rounded-t-2xl shadow-2xl"
      >
        <!-- Close button -->
        <button
          class="absolute top-4 end-4 z-20 w-9 h-9 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- Image or placeholder -->
        <div class="aspect-video w-full overflow-hidden sm:rounded-t-2xl rounded-t-2xl">
          <img
            v-if="project.img"
            :src="'/assets/img/projects/' + project.img"
            :alt="project.name"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center"
          >
            <span class="text-6xl font-bold text-primary/20">{{ project.name.charAt(0) }}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 sm:p-8">
          <!-- Header -->
          <div class="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 class="text-2xl font-bold">{{ project.name }}</h2>
              <p class="text-[var(--color-text-muted)] mt-1">{{ project.company }}</p>
            </div>
            <span class="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full flex-shrink-0 mt-1">
              {{ project.type }}
            </span>
          </div>

          <!-- Role & Team -->
          <div class="flex flex-wrap gap-4 mb-6 text-sm">
            <div v-if="project.role" class="flex items-center gap-2 text-[var(--color-text-muted)]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
              {{ project.role }}
            </div>
            <div v-if="project.teamSize" class="flex items-center gap-2 text-[var(--color-text-muted)]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.97 5.97 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.97 5.97 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Team of {{ project.teamSize }}
            </div>
          </div>

          <!-- Description -->
          <p class="text-[var(--color-text-muted)] leading-relaxed mb-6">
            {{ project.description }}
          </p>

          <!-- Tech stack -->
          <div class="mb-6">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Tech Stack</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="t in project.tech"
                :key="t"
                class="px-3 py-1.5 text-sm rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]"
              >{{ t }}</span>
            </div>
          </div>

          <!-- Highlights -->
          <div v-if="project.highlights && project.highlights.length" class="mb-6">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-3">Key Highlights</h3>
            <ul class="space-y-2">
              <li v-for="(h, i) in project.highlights" :key="i" class="flex gap-2 text-sm text-[var(--color-text-muted)]">
                <span class="text-primary flex-shrink-0 mt-0.5">▸</span>
                <span>{{ h }}</span>
              </li>
            </ul>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-2">
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              Visit Project
            </a>
            <button
              class="btn-outline text-sm"
              @click="$emit('close')"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  project: Object,
})

defineEmits(['close'])

// Close on Escape
onMounted(() => {
  const handler = (e) => {
    if (e.key === 'Escape') {
      // emit close via parent
      document.dispatchEvent(new CustomEvent('close-project-modal'))
    }
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>
