import { BarRomagnaTheme } from "./app/assets/bar-romagna-theme"

const SITE_URL = 'https://www.barromagna.com'

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
    '@/assets/scss/theme.scss',
    'flag-icons/css/flag-icons.min.css'
  ],

  // ── Global head defaults ──────────────────────────────────────
  app: {
    head: {
      htmlAttrs: { lang: 'it' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        // Canonical fallback — overridden per-page
        { rel: 'canonical', href: SITE_URL }
      ],
      meta: [
        // Default title + description (overridden per-page via useSeoMeta)
        { name: 'description',        content: 'Bar Romagna a Cervia dal 2007. Colazione, aperitivo e serate. Via Salara Statale 35/M. Gestito da Nadia e Mattia.' },
        // Open Graph defaults
        { property: 'og:type',        content: 'website' },
        { property: 'og:site_name',   content: 'Bar Romagna Cervia' },
        { property: 'og:url',         content: SITE_URL },
        { property: 'og:image',       content: `${SITE_URL}/bar-view.jpg` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height',content: '630' },
        { property: 'og:locale',      content: 'it_IT' },
        // Twitter Card defaults
        { name: 'twitter:card',       content: 'summary_large_image' },
        { name: 'twitter:image',      content: `${SITE_URL}/bar-view.jpg` },
        // Geo + local business signals
        { name: 'geo.region',         content: 'IT-RA' },
        { name: 'geo.placename',      content: 'Cervia' },
        { name: 'geo.position',       content: '44.2562331;12.2766308' },
        { name: 'ICBM',               content: '44.2562331, 12.2766308' },
      ],
      title: 'Bar Romagna Cervia — Caffè, Aperitivo & Serate dal 2007',
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
    '@primevue/nuxt-module',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
  ],

  // ── i18n ─────────────────────────────────────────────────────
  i18n: {
    locales: [
      { code: 'it', language: 'it-IT', file: 'it.ts', name: 'Italiano',  flag: '🇮🇹', countryCode: 'it' },
      { code: 'en', language: 'en-US', file: 'en.ts', name: 'English',   flag: '🇬🇧', countryCode: 'gb' },
      { code: 'es', language: 'es-ES', file: 'es.ts', name: 'Español',   flag: '🇪🇸', countryCode: 'es' },
      { code: 'de', language: 'de-DE', file: 'de.ts', name: 'Deutsch',   flag: '🇩🇪', countryCode: 'de' },
      { code: 'fr', language: 'fr-FR', file: 'fr.ts', name: 'Français',  flag: '🇫🇷', countryCode: 'fr' },
    ],
    defaultLocale: 'it',
    langDir: 'locales',
    strategy: 'no_prefix',
  },

  // ── Sitemap ──────────────────────────────────────────────────
  sitemap: {
    siteUrl: SITE_URL,
    // Static core routes
    urls: [
      { loc: '/',         priority: 1.0, changefreq: 'weekly'  },
      { loc: '/menu',     priority: 0.9, changefreq: 'monthly' },
      { loc: '/events',   priority: 0.8, changefreq: 'weekly'  },
      { loc: '/contacts', priority: 0.7, changefreq: 'monthly' },
    ],
    // Dynamic source: one URL per event (see server/api/__sitemap__/urls.ts)
    sources: [
      '/api/__sitemap__/urls',
    ],
    xsl: false,
  },

  // ── PrimeVue ─────────────────────────────────────────────────
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
