<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-primary mb-4">
        {{ error?.statusCode || 500 }}
      </h1>
      <p class="text-xl text-[var(--color-text-muted)] mb-8">
        {{ error?.statusCode === 404 ? 'Page not found' : 'An error occurred' }}
      </p>
      <button
        class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
        @click="handleError"
      >
        Go Home
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>
