<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { locale } = useI18n()
const config = useRuntimeConfig()

// Set dir attribute for RTL languages
useHead({
  htmlAttrs: computed(() => ({
    dir: locale.value === 'ar' ? 'rtl' : 'ltr',
    lang: locale.value,
  })),
})

// Global SEO defaults
useSeoMeta({
  ogUrl: config.public.siteUrl,
  ogLocale: 'en_US',
  robots: 'index, follow',
})
</script>
