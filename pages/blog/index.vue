<template>
  <div class="section-wrapper">
    <h1 class="section-title">Blog</h1>
    <p class="text-[var(--color-text-muted)]">Coming soon — will be connected to Appwrite in Phase 6.</p>
    <div class="mt-8 flex gap-4">
      <NuxtLink to="/blog/courses" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
        Courses
      </NuxtLink>
      <NuxtLink to="/blog/coding-test" class="px-4 py-2 bg-[var(--color-surface)] rounded-lg hover:bg-[var(--color-border)] transition-colors">
        Coding Test
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blog' })
</script>
