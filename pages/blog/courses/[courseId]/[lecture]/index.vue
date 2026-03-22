<template>
  <div class="section-wrapper">
    <h1 class="section-title">Lecture: {{ route.params.lecture }}</h1>
    <p class="text-[var(--color-text-muted)]">Lecture content — placeholder.</p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blog' })
const route = useRoute()
</script>
