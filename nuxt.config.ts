// https://nuxt.com/docs/api/configuration/nuxt-config
import Lara from '@primeuix/themes/lara';

export default defineNuxtConfig({
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