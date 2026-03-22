<template>
  <div class="section-wrapper">
    <h1 class="section-title">Course: {{ route.params.courseId }}</h1>
    <p class="text-[var(--color-text-muted)]">Course details — placeholder.</p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blog' })
const route = useRoute()
</script>
