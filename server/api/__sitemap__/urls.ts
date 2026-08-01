// server/api/__sitemap__/urls.ts
// Dynamic sitemap source for @nuxtjs/sitemap.
// Emits one entry per event so search engines discover every event detail page.

import { events, isPastEvent } from '../../../app/utils/events'

export default defineSitemapEventHandler(() =>
  events.map(event => ({
    loc: `/events/${event.slug}`,
    lastmod: event.date,
    changefreq: isPastEvent(event) ? 'yearly' : 'weekly',
    priority: 0.7,
  })),
)
