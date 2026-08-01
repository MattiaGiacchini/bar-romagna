// utils/events.ts
// Centralized events data for Bar Romagna

export type EventCategory = 'musica' | 'torneo'

export interface FoodInfo {
  description: string   // e.g. "Piadina con salsiccia e cipolla"
  price?: number        // e.g. 8 (€8)
}

export interface BandInfo {
  name: string          // e.g. "I Vasconvolti"
  tributeOf?: string    // e.g. "Vasco Rossi"
  genre?: string        // e.g. "Rock italiano" — helps SEO / MusicGroup schema
  logo?: string         // path to band logo image in /public
  sameAs?: string[]     // official band links (site, Spotify, socials) for schema.performer
}

// A single piece of media in an event gallery.
// Images and locally-hosted videos (served from /public, no YouTube) are both supported.
export interface MediaItem {
  type: 'image' | 'video'
  src: string           // path in /public, e.g. '/events/ligaband-2025/01.jpg'
  alt: string           // descriptive alt / caption (include band + venue + city for SEO)
  poster?: string       // video only: thumbnail shown before playback
}

export interface BarEvent {
  id: string
  slug: string          // SEO-friendly URL segment: /events/<slug>
  title: string
  description: string
  date: string          // ISO: 'YYYY-MM-DD'
  time: string          // music/event start: 'HH:MM'
  endTime?: string      // optional end time: 'HH:MM' — used for schema endDate
  foodTime?: string     // food service start (music events): 'HH:MM'
  meetupTime?: string   // meetup/ritrovo time (tournament events): 'HH:MM'
  category: EventCategory
  image: string         // card thumbnail path in /public
  poster?: string       // large hero/poster image for the detail page (falls back to image)
  gallery?: MediaItem[]  // photos & videos added AFTER the event has taken place
  recap?: string        // post-event write-up ("com'è andata") — great fresh SEO content
  featured: boolean
  freeEntry: boolean
  entryFee?: number     // tournament entry fee in €
  prizes?: string       // prize description
  food?: FoodInfo
  band?: BandInfo
}

export const events: BarEvent[] = [

  // ── MUSIC EVENTS ──────────────────────────────────────────────────

  {
    id: 'vasconvolti-2022',
    slug: 'i-vasconvolti-tributo-vasco-rossi-2022',
    title: 'I Vasconvolti — Tributo a Vasco Rossi',
    description: 'Una serata all\'insegna del rock italiano con I Vasconvolti, tributo ufficiale a Vasco Rossi. Musica dal vivo, piadina romagnola e tanto calore.',
    date: '2022-06-23',
    time: '21:00',
    foodTime: '19:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Piadina con salsiccia e cipolla (o piadina e affettati)', price: 8 },
    band: { name: 'I Vasconvolti', tributeOf: 'Vasco Rossi', genre: 'Rock italiano' },
  },

  {
    id: 'vasconvolti-2023',
    slug: 'i-vasconvolti-tributo-vasco-rossi-2023',
    title: 'I Vasconvolti — Tributo a Vasco Rossi',
    description: 'Torna il tributo più atteso dell\'estate al Bar Romagna. I Vasconvolti portano sul palco tutta l\'energia di Vasco Rossi. Cena e concerto.',
    date: '2023-06-30',
    time: '21:00',
    foodTime: '20:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Piadina con salsiccia e cipolla (o piadina e affettati)', price: 8 },
    band: { name: 'I Vasconvolti', tributeOf: 'Vasco Rossi', genre: 'Rock italiano' },
  },

  {
    id: 'barboni-lusso-2023',
    slug: 'barboni-di-lusso-2023',
    title: 'Barboni di Lusso',
    description: 'Serata di musica dal vivo con i Barboni di Lusso. Atmosfera unica, crescioni misti e tanta musica sotto le stelle.',
    date: '2023-07-28',
    time: '21:00',
    foodTime: '20:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Piadina affettati e/o crescioni misti', price: 8 },
    band: { name: 'Barboni di Lusso' },
  },

  {
    id: 'barboni-lusso-2024',
    slug: 'barboni-di-lusso-2024',
    title: 'Barboni di Lusso',
    description: 'I Barboni di Lusso tornano al Bar Romagna per una serata di musica dal vivo. Food truck speciale con hamburger e patatine.',
    date: '2024-06-07',
    time: '21:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Food truck Mama Ely – hamburger e patatine', price: 10 },
    band: { name: 'Barboni di Lusso' },
  },

  {
    id: 'herpes-luglio-2024',
    slug: 'gli-herpes-2024',
    title: 'Gli Herpes',
    description: 'Serata rock con Gli Herpes. Musica dal vivo, piadina e porchetta per una notte da ricordare al Bar Romagna.',
    date: '2024-07-05',
    time: '21:15',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Piadina e porchetta (o piadina e affettati)', price: 8 },
    band: { name: 'Gli Herpes', genre: 'Rock' },
  },

  {
    id: 'vasconvolti-2024',
    slug: 'i-vasconvolti-tributo-vasco-rossi-2024',
    title: 'I Vasconvolti — Tributo a Vasco Rossi',
    description: 'L\'estate del Bar Romagna non sarebbe completa senza I Vasconvolti. Rock, piadina e la magia di Vasco Rossi sotto le stelle di Castiglione di Cervia.',
    date: '2024-07-19',
    time: '21:15',
    foodTime: '19:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Piadina con salsiccia e cipolla', price: 8 },
    band: { name: 'I Vasconvolti', tributeOf: 'Vasco Rossi', genre: 'Rock italiano' },
    recap: 'Che serata! Il piazzale del Bar Romagna si è riempito già dall\'ora di cena, tra piadine calde e il profumo della salsiccia sulla griglia. Poi, quando I Vasconvolti hanno attaccato con "Vita spericolata", si è alzato un coro che è andato avanti fino a tarda notte. Grazie a tutti quelli che hanno cantato con noi sotto le stelle di Castiglione di Cervia: ci vediamo alla prossima!',
    // Per aggiungere le foto della serata: metti i file in /public/events/i-vasconvolti-tributo-vasco-rossi-2024/
    // e aggiungi qui un array `gallery` come quello dell'evento Ligaband 2025.
  },

  {
    id: 'herpes-luglio-2025',
    slug: 'gli-herpes-2025',
    title: 'Gli Herpes',
    description: 'Gli Herpes tornano al Bar Romagna per una nuova serata di rock dal vivo. Cena con piadina, musica e tanta energia.',
    date: '2025-07-11',
    time: '21:00',
    foodTime: '19:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Piadina con salsiccia e cipolla (o piadina e affettati)', price: 8 },
    band: { name: 'Gli Herpes', genre: 'Rock' },
  },

  {
    id: 'ligaband-2025',
    slug: 'ligaband-tributo-ligabue-2025',
    title: 'Ligaband — Tributo a Ligabue',
    description: 'Ligaband porta al Bar Romagna tutta la potenza di Ligabue. Una serata di rock romagnolo autentico, con cena e musica dal vivo.',
    date: '2025-08-01',
    time: '21:00',
    foodTime: '19:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: true,
    freeEntry: true,
    food: { description: 'Piadina con salsiccia e cipolla (o piadina e affettati)', price: 8 },
    band: { name: 'Ligaband', tributeOf: 'Ligabue', genre: 'Rock italiano' },
    gallery: [
      { type: 'image', src: '/events/ligaband-tributo-ligabue-2025/526673454_606298432534537_3602003102610527343_n.jpg', alt: 'Ligaband dal vivo al Bar Romagna di Castiglione di Cervia — tributo a Ligabue' },
      { type: 'image', src: '/events/ligaband-tributo-ligabue-2025/526741632_606298422534538_7798611895626345989_n.jpg', alt: 'Il cantante della Ligaband durante il concerto tributo a Ligabue al Bar Romagna' },
      { type: 'image', src: '/events/ligaband-tributo-ligabue-2025/527227010_606298469201200_6477704836186683912_n.jpg', alt: 'La Ligaband sul palco del Bar Romagna a Castiglione di Cervia' },
      { type: 'image', src: '/events/ligaband-tributo-ligabue-2025/527324982_606297665867947_5586445882646178566_n.jpg', alt: 'Chitarrista della Ligaband in concerto al Bar Romagna, serata rock romagnolo' },
      { type: 'image', src: '/events/ligaband-tributo-ligabue-2025/527886253_606297809201266_4047375438246265758_n.jpg', alt: 'Il pubblico del Bar Romagna alla serata tributo a Ligabue con la Ligaband' },
      { type: 'image', src: '/events/ligaband-tributo-ligabue-2025/528052591_606297672534613_3727101562743165166_n.jpg', alt: 'La Ligaband dal vivo sotto le stelle di Castiglione di Cervia al Bar Romagna' },
    ],
  },

  // ── TOURNAMENTS ───────────────────────────────────────────────────

  {
    id: 'torneo-2022',
    slug: 'torneo-di-marafone-giugno-2022',
    title: 'Torneo di Marafone',
    description: 'Torna il torneo di Marafone a figure del Bar Romagna. Sfida i migliori giocatori della zona a maraffa per aggiudicarti i ricchi premi in palio.',
    date: '2022-06-16',
    time: '20:30',
    category: 'torneo',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: false,
    entryFee: 10,
    prizes: 'Ricchi premi',
  },

  {
    id: 'torneo-maggio-2023',
    slug: 'torneo-di-marafone-maggio-2023',
    title: 'Torneo di Marafone',
    description: 'Appuntamento primaverile con il torneo di Marafone a figure al Bar Romagna. Ritrovo alle 20:30, inizio alle 21:00.',
    date: '2023-05-17',
    time: '21:00',
    meetupTime: '20:30',
    category: 'torneo',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: false,
    entryFee: 10,
  },

  {
    id: 'torneo-dicembre-2023',
    slug: 'torneo-di-marafone-dicembre-2023',
    title: 'Torneo di Marafone',
    description: 'Il torneo invernale di Marafone a figure è tornato. Ricchi premi per i vincitori.',
    date: '2023-12-02',
    time: '15:00',
    meetupTime: '14:45',
    category: 'torneo',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: false,
    entryFee: 10,
    prizes: 'Ricchi premi',
  },

  {
    id: 'torneo-febbraio-2024',
    slug: 'torneo-di-marafone-febbraio-2024',
    title: 'Torneo di Marafone',
    description: 'Torneo invernale di Marafone a figure al Bar Romagna.',
    date: '2024-02-17',
    time: '15:00',
    meetupTime: '14:45',
    category: 'torneo',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: false,
    entryFee: 10,
  },
]

// ── Helpers ──────────────────────────────────────────────────────────
const today = new Date()
today.setHours(0, 0, 0, 0)

export const pastEvents = events
  .filter(e => new Date(e.date) < today)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const upcomingEvents = events
  .filter(e => new Date(e.date) >= today)
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

// Look up a single event by its URL slug.
export const getEventBySlug = (slug: string): BarEvent | undefined =>
  events.find(e => e.slug === slug)

// Related events for internal linking on the detail page.
// Priority: same band (any year) → same category. Self excluded, most recent first.
export const getRelatedEvents = (event: BarEvent, limit = 3): BarEvent[] => {
  const bySameBand = event.band
    ? events.filter(e => e.id !== event.id && e.band?.name === event.band?.name)
    : []

  const bySameCategory = events.filter(
    e => e.id !== event.id && e.category === event.category && !bySameBand.includes(e),
  )

  return [...bySameBand, ...bySameCategory]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

// Whether an event's date is in the past (relative to today).
export const isPastEvent = (event: BarEvent): boolean =>
  new Date(event.date) < today
