// utils/business.ts
// Single source of truth for Bar Romagna's business identity (NAP data).
// Reused by the homepage LocalBusiness schema and by every event's
// structured data (location / organizer), so that name, address, phone
// and geo signals stay perfectly consistent across the whole site.

export const SITE_URL = 'https://www.barromagna.com'

export const business = {
  name: 'Bar Romagna',
  legalName: 'Bar Romagna Cervia',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-vertical.svg`,
  image: `${SITE_URL}/bar-view.jpg`,
  description:
    'Bar storico di Castiglione di Cervia dal 2007. Colazione, aperitivo, serate con musica dal vivo ed eventi. Gestito da Nadia e Mattia.',
  foundingDate: '2007',
  telephone: '+393395936104',
  email: 'barromagna.cervia@gmail.com',
  priceRange: '€',
  hasMap: 'https://maps.app.goo.gl/N1Bbdvc4ty9JZ2k27',

  address: {
    streetAddress: 'Via Salara Statale, 35/M',
    addressLocality: 'Cervia',
    addressRegion: 'RA',
    postalCode: '48015',
    addressCountry: 'IT',
  },

  geo: {
    latitude: 44.2562331,
    longitude: 12.2766308,
  },

  sameAs: [
    'https://www.facebook.com/p/Bar-Romagna-100094631556500/',
    // Instagram hidden for now — keep here to re-enable later:
    // 'https://www.instagram.com/barromagna',
    'https://maps.app.goo.gl/N1Bbdvc4ty9JZ2k27',
  ],
} as const

// schema.org PostalAddress node — handy for embedding inside other schemas.
export const postalAddressSchema = {
  '@type': 'PostalAddress',
  streetAddress: business.address.streetAddress,
  addressLocality: business.address.addressLocality,
  addressRegion: business.address.addressRegion,
  postalCode: business.address.postalCode,
  addressCountry: business.address.addressCountry,
} as const

// schema.org Place node describing the venue where events take place.
export const venuePlaceSchema = {
  '@type': 'Place',
  name: business.name,
  address: postalAddressSchema,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  },
  hasMap: business.hasMap,
} as const

// Full LocalBusiness (BarOrPub) JSON-LD for the homepage.
// Kept here so the site's core NAP data lives in exactly one place.
export const buildLocalBusinessJsonLd = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'BarOrPub',
  name: business.name,
  url: business.url,
  logo: `${SITE_URL}/logo-barromagna.svg`,
  image: business.image,
  description: business.description,
  telephone: business.telephone,
  email: business.email,
  foundingDate: business.foundingDate,
  address: postalAddressSchema,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  },
  hasMap: business.hasMap,
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:30', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '06:30', closes: '23:00' },
  ],
  servesCuisine: ['Caffetteria', 'Aperitivo', 'Cocktail'],
  priceRange: business.priceRange,
  sameAs: business.sameAs,
})
