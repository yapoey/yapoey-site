import { defineStore, skipHydrate } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<'light' | 'dark'>('light')

  const isDark = computed(() => mode.value === 'dark')

  function initColorMode() {
    if (import.meta.server) {
      // Read cookie on server via Nuxt's useCookie (called outside store reactivity)
      const cookieMode = useCookie('mode').value
      if (cookieMode === 'dark' || cookieMode === 'light') {
        mode.value = cookieMode
      }
      return
    }

    // Client-side
    const saved = document.cookie
      .split('; ')
      .find(c => c.startsWith('mode='))
      ?.split('=')[1]

    if (saved === 'dark' || saved === 'light') {
      mode.value = saved
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      mode.value = 'dark'
    }
    applyClass()
  }

  function setColorMode(newMode: 'light' | 'dark') {
    mode.value = newMode
    if (import.meta.client) {
      document.cookie = `mode=${newMode};path=/;max-age=${60 * 60 * 24 * 365}`
      applyClass()
    }
  }

  function toggleColorMode() {
    setColorMode(mode.value === 'dark' ? 'light' : 'dark')
  }

  function applyClass() {
    if (import.meta.server) return
    const html = document.documentElement
    if (mode.value === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  return {
    mode,
    isDark,
    initColorMode,
    setColorMode,
    toggleColorMode,
  }
})
