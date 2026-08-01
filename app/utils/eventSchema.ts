// utils/eventSchema.ts
// Builds schema.org JSON-LD for a single event.
// - MusicEvent for concerts (category 'musica'), so Google can associate
//   the performing band/artist with Bar Romagna.
// - Event for tournaments (category 'torneo').
// Also builds a BreadcrumbList for the detail page.

import { SITE_URL, business, venuePlaceSchema } from './business'
import type { BarEvent } from './events'

const abs = (path: string): string =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`

const eventUrl = (event: BarEvent): string => `${SITE_URL}/events/${event.slug}`

// Combine ISO date + 'HH:MM' into a local ISO datetime string.
const dateTime = (date: string, time?: string): string =>
  time ? `${date}T${time}:00` : date

// Collect the best available images for the event (gallery images first, then poster/thumb).
const eventImages = (event: BarEvent): string[] => {
  const galleryImages = (event.gallery ?? [])
    .filter(m => m.type === 'image')
    .map(m => abs(m.src))
  const fallback = abs(event.poster ?? event.image)
  return galleryImages.length > 0 ? galleryImages : [fallback]
}

const buildOffers = (event: BarEvent) => {
  const price = event.freeEntry ? 0 : event.entryFee
  if (price === undefined) return undefined
  return {
    '@type': 'Offer',
    url: eventUrl(event),
    price,
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    validFrom: event.date,
  }
}

const buildPerformer = (event: BarEvent) => {
  if (!event.band) return undefined
  const performer: Record<string, unknown> = {
    '@type': 'MusicGroup',
    name: event.band.name,
  }
  if (event.band.genre) performer.genre = event.band.genre
  if (event.band.sameAs && event.band.sameAs.length > 0) performer.sameAs = event.band.sameAs
  return performer
}

const organizerSchema = {
  '@type': 'BarOrPub',
  name: business.name,
  url: SITE_URL,
  telephone: business.telephone,
} as const

// Main event JSON-LD node.
export const buildEventJsonLd = (event: BarEvent): Record<string, unknown> => {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': event.category === 'musica' ? 'MusicEvent' : 'Event',
    name: event.title,
    description: event.description,
    startDate: dateTime(event.date, event.time),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: venuePlaceSchema,
    organizer: organizerSchema,
    image: eventImages(event),
    url: eventUrl(event),
  }

  if (event.endTime) jsonLd.endDate = dateTime(event.date, event.endTime)

  const performer = buildPerformer(event)
  if (performer) jsonLd.performer = performer

  const offers = buildOffers(event)
  if (offers) jsonLd.offers = offers

  return jsonLd
}

// BreadcrumbList: Home › Eventi › <event title>
export const buildEventBreadcrumbJsonLd = (event: BarEvent): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Eventi', item: `${SITE_URL}/events` },
    { '@type': 'ListItem', position: 3, name: event.title, item: eventUrl(event) },
  ],
})
