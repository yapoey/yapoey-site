export default defineNuxtRouteMiddleware(() => {
  const themeStore = useThemeStore()
  themeStore.initColorMode()
})
