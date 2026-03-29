<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-primary mb-4">
        {{ error?.statusCode || 500 }}
      </h1>
      <p class="text-xl text-[var(--color-text-muted)] mb-8">
        {{ error?.statusCode === 404 ? $t('ErrorPage.pageNotFound') : $t('ErrorPage.errorOccurred') }}
      </p>
      <NuxtLink
        to="/"
        class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        {{ $t('ErrorPage.goHome') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: Object,
})
</script>
