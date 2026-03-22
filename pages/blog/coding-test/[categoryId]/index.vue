<template>
  <div class="section-wrapper">
    <h1 class="section-title">Category: {{ route.params.categoryId }}</h1>
    <p class="text-[var(--color-text-muted)]">Problems list — placeholder.</p>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blog' })
const route = useRoute()
</script>
