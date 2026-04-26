export default defineNuxtConfig({
  compatibilityDate: '2025-03-22',

  devServer: {
    port: 3333,
    host: '0.0.0.0',
  },

  ssr: true,

  nitro: {
    preset: 'aws-amplify',
  },

  css: ['~/assets/scss/main.scss'],

  app: {
    head: {
      title: 'YapoeY | Mohamed Ibrahim',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'Mohamed Ibrahim (YapoeY) | Full Stack Developer & Product Engineer based in Seoul, Korea. Vue.js, React, Node.js, TypeScript.' },
        { name: 'author', content: 'Mohamed Ibrahim' },
        { name: 'theme-color', content: '#6366f1' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'YapoeY' },
        { property: 'og:image', content: 'https://yapoey.com/assets/img/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'YapoeY | Mohamed Ibrahim | Full Stack Developer' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://yapoey.com/assets/img/og-image.png' },
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
    '@nuxtjs/sitemap',
  ],

  // Sitemap
  site: {
    url: 'https://yapoey.com',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  // Google Analytics (GA4) — measurement ID is public (ships in every page)
  gtag: {
    id: process.env.GA_MEASUREMENT_ID || 'G-V72EEBF35V',
    enabled: process.env.NODE_ENV === 'production',
  },

  // Google Fonts
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
      siteUrl: 'https://yapoey.com',
      gaMeasurementId: process.env.GA_MEASUREMENT_ID || '',
      appwriteEndpoint: process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
      appwriteProjectId: process.env.APPWRITE_PROJECT_ID || '',
    },
  },
})
