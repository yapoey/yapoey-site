<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isSticky ? 'bg-[var(--color-bg)] bg-opacity-90 backdrop-blur-md shadow-sm border-b border-[var(--color-border)]' : 'bg-transparent'"
  >
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

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-6">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            @click.prevent="smoothScroll(item.href)"
          >
            {{ $t(item.label) }}
          </a>
          <NuxtLink
            to="/blog"
            class="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            {{ $t('Header.blog') }}
          </NuxtLink>

          <!-- CLI Mode -->
          <NuxtLink
            to="/cli"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-green-400 bg-green-500/10 border border-green-500/20 hover:border-green-400 hover:bg-green-500/15 transition-all"
          >
            <span class="text-green-500">&gt;_</span> CLI
          </NuxtLink>

          <!-- Language Switcher -->
          <div class="relative" ref="langDropdown">
            <button
              class="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
              @click="showLangMenu = !showLangMenu"
            >
              {{ $t('Header.languages') }}
            </button>
            <div
              v-show="showLangMenu"
              class="absolute right-0 mt-2 w-32 glass rounded-lg shadow-lg py-1"
            >
              <button
                v-for="loc in availableLocales"
                :key="loc.code"
                class="block w-full text-left px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
                @click="switchLocale(loc.code)"
              >
                {{ loc.name }}
              </button>
            </div>
          </div>

          <!-- Dark Mode Toggle -->
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
        </nav>

        <!-- Mobile: dark mode + hamburger -->
        <div class="flex lg:hidden items-center gap-3">
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
          <button
            class="p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
            aria-label="Toggle menu"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="mobileMenuOpen"
      class="lg:hidden bg-[var(--color-bg)] border-t border-[var(--color-border)]"
    >
      <div class="px-4 py-3 space-y-2">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
          @click.prevent="smoothScroll(item.href); mobileMenuOpen = false"
        >
          {{ $t(item.label) }}
        </a>
        <NuxtLink
          to="/blog"
          class="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
          @click="mobileMenuOpen = false"
        >
          {{ $t('Header.blog') }}
        </NuxtLink>
        <NuxtLink
          to="/cli"
          class="block px-3 py-2 rounded-lg text-sm font-mono font-medium text-green-400 hover:bg-green-500/10 transition-colors"
          @click="mobileMenuOpen = false"
        >
          &gt;_ CLI Mode
        </NuxtLink>
        <div class="border-t border-[var(--color-border)] pt-2">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            class="block w-full text-left px-3 py-2 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
            @click="switchLocale(loc.code); mobileMenuOpen = false"
          >
            {{ loc.name }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const { locale, setLocale } = useI18n()
const themeStore = useThemeStore()

const isSticky = ref(false)
const mobileMenuOpen = ref(false)
const showLangMenu = ref(false)
const langDropdown = ref(null)

const navItems = [
  { href: '#body', label: 'Header.home' },
  { href: '#about', label: 'Header.about' },
  { href: '#resume', label: 'Header.resume' },
  { href: '#works', label: 'Header.works' },
  { href: '#contact', label: 'Header.contact' },
]

const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'ko', name: '한국어' },
  { code: 'ar', name: 'العربية' },
]

function smoothScroll(href) {
  const el = document.querySelector(href)
  if (el) {
    const offset = 70
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

async function switchLocale(code) {
  await setLocale(code)
  showLangMenu.value = false
}

function handleScroll() {
  isSticky.value = window.scrollY > 100
}

function handleClickOutside(e) {
  if (langDropdown.value && !langDropdown.value.contains(e.target)) {
    showLangMenu.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>
