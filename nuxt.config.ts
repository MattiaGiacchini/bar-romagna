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
  // Note: htmlAttrs.lang and og:locale are set dynamically per-locale in the layout
  // via useLocaleHead(). Only truly static, locale-independent defaults live here.
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          // Google Tag Manager — must be as high as possible in <head>
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P78KHX28');`,
          tagPosition: 'head',
        }
      ],
      noscript: [
        {
          // Google Tag Manager (noscript) — renders right after <body> opens
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P78KHX28" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          tagPosition: 'bodyOpen',
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon-512.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      meta: [
        // Default title + description (overridden per-page via useSeoMeta)
        { name: 'description',        content: 'Bar Romagna a Cervia dal 2007. Colazione, aperitivo e serate. Via Salara Statale 35/M. Gestito da Nadia e Mattia.' },
        // Open Graph defaults (og:locale set dynamically in layout)
        { property: 'og:type',        content: 'website' },
        { property: 'og:site_name',   content: 'Bar Romagna Cervia' },
        { property: 'og:url',         content: SITE_URL },
        { property: 'og:image',       content: `${SITE_URL}/bar-view.jpg` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height',content: '630' },
        // Twitter Card defaults
        { name: 'twitter:card',       content: 'summary_large_image' },
        { name: 'twitter:site',       content: '@barromagna' },
        { name: 'twitter:image',      content: `${SITE_URL}/bar-view.jpg` },
        // Robots — explicit index/follow on all pages
        { name: 'robots',             content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
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
    // Enables useLocaleHead() to emit hreflang alternate links and og:locale
    seo: true,
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
