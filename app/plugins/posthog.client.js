import { defineNuxtPlugin } from '#app'
import posthog from 'posthog-js'

export default defineNuxtPlugin(nuxtApp => {
    const runtimeConfig = useRuntimeConfig()

    const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
        api_host: runtimeConfig.public.posthogHost,
        // Locks in modern default behaviours (SPA-aware pageviews via
        // `history_change`, pageleave, rage & dead clicks, etc.).
        defaults: runtimeConfig.public.posthogDefaults,

        // Public site with no login: create a person profile for every
        // visitor so anonymous journeys are analysable end-to-end.
        person_profiles: 'always',

        // ── Autocapture (clicks, inputs, form submits, rage & dead clicks) ──
        autocapture: true,
        rageclick: true,
        capture_dead_clicks: true,

        // ── Navigation ──
        // `history_change` = capture a $pageview on every SPA route change.
        capture_pageview: 'history_change',
        capture_pageleave: true,

        // ── Heatmaps ── (force on client-side, don't rely only on project settings)
        capture_heatmaps: true,

        // ── Performance: network timing + Web Vitals (LCP, FID, CLS, ...) ──
        capture_performance: true,

        // ── Error tracking: capture uncaught exceptions automatically ──
        capture_exceptions: true,

        // ── Session replay ──
        disable_session_recording: false,
        enable_recording_console_log: true,
        session_recording: {
            // Privacy: mask what users type. There are no meaningful forms on
            // the site, so this costs nothing and keeps recordings safe.
            maskAllInputs: true,
        },

        loaded: (ph) => {
            // App-wide super properties attached to every captured event.
            ph.register({
                app: 'barromagna-web',
            })
            if (import.meta.dev) ph.debug()
        }
    })

    return {
        provide: {
            posthog: () => posthogClient
        }
    }
})
