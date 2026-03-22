<template>
  <div class="section-wrapper">
    <h1 class="section-title">Problem: {{ route.params.problemId }}</h1>
    <p class="text-[var(--color-text-muted)]">Problem details — placeholder.</p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blog' })
const route = useRoute()
</script>
