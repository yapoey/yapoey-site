<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { locale } = useI18n()

// Set dir attribute for RTL languages
useHead({
  htmlAttrs: computed(() => ({
    dir: locale.value === 'ar' ? 'rtl' : 'ltr',
    lang: locale.value,
  })),
})
</script>
