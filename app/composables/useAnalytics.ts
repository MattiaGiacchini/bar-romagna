// composables/useAnalytics.ts
// Thin, typed wrapper around the PostHog client provided by the
// posthog.client.js plugin. Centralises every custom event the site
// tracks so names/properties stay consistent and analysable.
//
// Usage in a component:
//   const analytics = useAnalytics()
//   analytics.trackContact({ method: 'call', person: 'nadia', location: 'contacts' })
//
// All calls are safe no-ops during SSR (the plugin is client-only).

import type { PostHog } from 'posthog-js'
import type { BarEvent } from '@/utils/events'

type ContactMethod = 'call' | 'whatsapp' | 'email'
type ContactPerson = 'nadia' | 'mattia' | 'generic'
type CtaName = 'menu' | 'directions' | 'next_event' | 'events'
type SocialNetwork = 'facebook' | 'instagram'

export const useAnalytics = () => {
  const { $posthog } = useNuxtApp()

  // The plugin provides `$posthog` as `() => client`. It only exists on the
  // client, so guard for SSR and for the (unlikely) case init failed.
  const client = (): PostHog | undefined =>
    typeof $posthog === 'function' ? ($posthog() as PostHog | undefined) : undefined

  /** Low-level escape hatch: capture any custom event. */
  const capture = (event: string, properties: Record<string, unknown> = {}): void => {
    client()?.capture(event, properties)
  }

  /** Register a super property sent with every subsequent event. */
  const register = (properties: Record<string, unknown>): void => {
    client()?.register(properties)
  }

  // ── Shared event-shape helper ──────────────────────────────────────
  const eventProps = (event: BarEvent) => ({
    event_id: event.id,
    event_slug: event.slug,
    event_title: event.title,
    event_category: event.category,
    event_date: event.date,
    band: event.band?.name,
  })

  return {
    client,
    capture,
    register,

    /** Persist the active locale on every event (call on load + on switch). */
    setLocale: (locale: string) => register({ locale }),

    // ── Conversion: contact ──────────────────────────────────────────
    trackContact: (opts: { method: ContactMethod; person: ContactPerson; location: string }) =>
      capture('contact_click', opts),

    // ── Conversion: intent to visit ──────────────────────────────────
    trackDirections: (location: string) =>
      capture('directions_click', { location }),

    // ── Generic CTA (hero buttons, banners, ...) ─────────────────────
    trackCta: (cta: CtaName, location: string) =>
      capture('cta_click', { cta, location }),

    // ── Navigation ───────────────────────────────────────────────────
    trackNav: (label: string, route: string, source: 'desktop' | 'mobile' | 'footer') =>
      capture('nav_click', { label, route, source }),

    trackSocial: (network: SocialNetwork) =>
      capture('social_click', { network }),

    // ── Language ─────────────────────────────────────────────────────
    trackLanguageSwitch: (from: string, to: string) => {
      register({ locale: to })
      capture('language_switch', { from, to })
    },

    // ── Events ───────────────────────────────────────────────────────
    trackEventView: (event: BarEvent, isPast: boolean) =>
      capture('event_view', { ...eventProps(event), is_past: isPast }),

    trackEventCardClick: (event: BarEvent, location: 'events_list' | 'home' | 'related') =>
      capture('event_card_click', { ...eventProps(event), location }),

    trackEventsFilter: (filter: string) =>
      capture('events_filter_change', { filter }),

    // ── Gallery ──────────────────────────────────────────────────────
    trackGalleryOpen: (index: number, mediaType: string, total: number) =>
      capture('gallery_open', { index, media_type: mediaType, total }),

    trackGalleryNavigate: (direction: 'next' | 'prev') =>
      capture('gallery_navigate', { direction }),
  }
}
