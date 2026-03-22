<template>
  <div class="min-h-screen flex flex-col">
    <!-- Blog Header -->
    <header class="sticky top-0 z-50 bg-[var(--color-bg)] bg-opacity-80 backdrop-blur-md border-b border-[var(--color-border)]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex-shrink-0">
            <img
              v-if="themeStore.isDark"
              src="/assets/img/logo.white.png"
              alt="YapoeY"
              class="h-10 w-auto"
            />
            <img
              v-else
              src="/assets/img/logo.png"
              alt="YapoeY"
              class="h-10 w-auto"
            />
          </NuxtLink>

          <!-- Nav -->
          <nav class="hidden md:flex items-center gap-6">
            <NuxtLink
              to="/blog"
              class="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              active-class="!text-primary"
            >
              Courses
            </NuxtLink>
            <NuxtLink
              to="/blog/coding-test"
              class="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              active-class="!text-primary"
            >
              Coding Test
            </NuxtLink>
          </nav>

          <!-- Dark mode toggle -->
          <button
            class="p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
            aria-label="Toggle dark mode"
            @click="themeStore.toggleColorMode()"
          >
            <svg v-if="themeStore.isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 pt-4">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
const themeStore = useThemeStore()

useHead({
  title: 'YapoeY Blog',
})
</script>
