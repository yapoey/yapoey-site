export default defineNuxtPlugin((nuxtApp) => {
  // Fix Pinia SSR serialization issue with devalue
  // The "obj.hasOwnProperty is not a function" error occurs when
  // devalue tries to serialize objects created without Object prototype
  if (import.meta.server) {
    nuxtApp.hook('app:rendered', () => {
      const pinia = nuxtApp.$pinia as any
      if (pinia) {
        // Ensure all store state objects have proper prototype
        const state = pinia.state.value
        for (const key of Object.keys(state)) {
          const store = state[key]
          if (store && typeof store === 'object') {
            state[key] = Object.assign({}, store)
          }
        }
      }
    })
  }
})
