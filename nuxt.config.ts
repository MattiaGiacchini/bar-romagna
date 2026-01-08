import { BarRomagnaTheme } from "./app/assets/bar-romagna-theme"

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      posthogPublicKey: 'phc_Bdmz4pGPXd4RfIQj9NMs41pzbAL5NxNhLN9vBiiMGpl',
      posthogHost: 'https://eu.i.posthog.com',
      posthogDefaults: '2025-11-30'
    }
  },
  css: [
    'primeicons/primeicons.css',
    '@/assets/scss/theme.scss'
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/primeicons@7.0.0/primeicons.css'
        }
      ]
    }
  },
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/content',
    '@primevue/nuxt-module'
  ],
  primevue: {
    options: {
      theme: {
        preset: BarRomagnaTheme,
        options: {
          darkModeSelector: 'none'
        }
      }
    }
  }
})