export default defineNuxtConfig({
  compatibilityDate: '2025-03-22',

  devServer: {
    port: 3333,
    host: '0.0.0.0',
  },

  ssr: false,

  nitro: {
    preset: 'aws-amplify',
  },

  css: ['~/assets/scss/main.scss'],

  app: {
    head: {
      title: 'YapoeY — Portfolio',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'Mohamed Ibrahim — Full Stack Developer based in Seoul, Korea' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/assets/img/yap.png' },
      ],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    'nuxt-gtag',
  ],

  // Google Analytics (GA4)
  gtag: {
    id: process.env.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
    enabled: process.env.NODE_ENV === 'production',
  },

  // Google Fonts — Inter + JetBrains Mono
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
      'JetBrains Mono': [400, 500, 700],
    },
    display: 'swap',
  },

  // i18n
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.ts' },
      { code: 'ko', name: '한국어', file: 'ko.ts' },
      { code: 'ar', name: 'العربية', dir: 'rtl', file: 'ar.ts' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: '../locale/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  // Runtime config for env vars
  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    githubToken: process.env.GITHUB_TOKEN || '',
    appwriteApiKey: process.env.APPWRITE_API_KEY || '',
    public: {
      gaMeasurementId: process.env.GA_MEASUREMENT_ID || '',
      appwriteEndpoint: process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
      appwriteProjectId: process.env.APPWRITE_PROJECT_ID || '',
    },
  },
})
