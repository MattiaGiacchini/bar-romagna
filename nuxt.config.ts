// https://nuxt.com/docs/api/configuration/nuxt-config
import Lara from '@primeuix/themes/lara';

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      posthogPublicKey: 'phc_Bdmz4pGPXd4RfIQj9NMs41pzbAL5NxNhLN9vBiiMGpl',
      posthogHost: 'https://eu.i.posthog.com',
      posthogDefaults: '2025-11-30'
    }
  },

  // css: ['~/assets/scss/theme.scss'],
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
        preset: Lara
      }
    }
  }
})