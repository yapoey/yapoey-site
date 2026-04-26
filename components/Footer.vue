<template>
  <footer class="border-t border-[var(--color-border)]">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Logo -->
        <NuxtLink to="/" class="flex-shrink-0" @click="analytics.navClick('logo', 'footer')">
          <img
            v-if="themeStore.isDark"
            src="/assets/img/logo.white.png"
            alt="YapoeY"
            class="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
          />
          <img
            v-else
            src="/assets/img/logo.png"
            alt="YapoeY"
            class="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity"
          />
        </NuxtLink>

        <!-- Social Links -->
        <div class="flex items-center gap-4">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-primary hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-200"
            :aria-label="link.name"
            v-html="link.svg"
            @click="analytics.socialClick(link.name.toLowerCase(), 'footer')"
          />
        </div>

        <!-- Copyright -->
        <p class="text-sm text-[var(--color-text-muted)]">
          &copy; {{ new Date().getFullYear() }} YapoeY
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const themeStore = useThemeStore()
const analytics = useAnalytics()

const socialLinks = [
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/c/yapoey-tech',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.7 31.7 0 000 12a31.7 31.7 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.7 31.7 0 0024 12a31.7 31.7 0 00-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/yapoey/',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/></svg>',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/yapoey',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.16c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.33-1.76c-1.09-.74.08-.73.08-.73a2.52 2.52 0 011.84 1.24 2.56 2.56 0 003.5 1 2.56 2.56 0 01.76-1.6c-2.67-.3-5.47-1.33-5.47-5.93a4.64 4.64 0 011.24-3.22 4.3 4.3 0 01.12-3.18s1-.33 3.3 1.23a11.4 11.4 0 016 0c2.3-1.56 3.3-1.23 3.3-1.23a4.3 4.3 0 01.12 3.18 4.64 4.64 0 011.24 3.22c0 4.61-2.81 5.63-5.48 5.93a2.86 2.86 0 01.82 2.22v3.29c0 .32.22.7.82.58A12 12 0 0012 .3"/></svg>',
  },
]
</script>
